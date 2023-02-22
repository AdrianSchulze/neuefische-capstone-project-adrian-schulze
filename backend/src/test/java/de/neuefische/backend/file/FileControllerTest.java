package de.neuefische.backend.file;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import java.util.HashMap;

import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.httpBasic;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.multipart;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
@DirtiesContext(classMode = DirtiesContext.ClassMode.BEFORE_EACH_TEST_METHOD)
class FileControllerTest {

    @Autowired
    MockMvc mockMvc;

    @Test
    void signup() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.post("/api/users/signup")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {
                                    "username": "user1",
                                    "password": "password"
                                }
                                """))
                .andExpectAll(MockMvcResultMatchers.status().isOk(),
                        content()
                                .json("""
                                          {
                                            "username": "user1",
                                            "password": "",
                                            "role": "BASIC",
                                            "imageId": "63e25bbb0d39f00e892a7c93"
                                        }
                                        """, false));
    }

    @Test
    void uploadFile_whenLoggedIn_isOk() throws Exception {
        signup();
        MockMultipartFile file = new MockMultipartFile(
                "file",
                "test.txt",
                "text/plain",
                "test data".getBytes()
        );

        mockMvc.perform(multipart("/api/files")
                        .file(file)
                        .with(httpBasic("user1", "password"))
                )
                .andExpect(status().isOk());
    }

    @Test
    void uploadFile_whenNotLoggedIn_unauthorized() throws Exception {
        MockMultipartFile file = new MockMultipartFile(
                "file",
                "test.txt",
                "text/plain",
                "test data".getBytes()
        );

        mockMvc.perform(multipart("/api/files")
                        .file(file)
                        .with(httpBasic("user1", "password"))
                )
                .andExpect(status().isUnauthorized());
    }

    @Test
    void getFileById_whenOk_isOk() throws Exception {
        signup();
        MockMultipartFile file = new MockMultipartFile(
                "file",
                "test.txt",
                "text/plain",
                "test data".getBytes()
        );

        String expectedFile = """
                {
                    "name": "test.txt",
                    "contentType": "text/plain",
                    "size": 9
                }
                """;

        String response = this.mockMvc.perform(multipart("/api/files")
                        .file(file)
                        .with(httpBasic("user1", "password"))
                )
                .andExpect(status().isOk())
                .andExpect(content().json(expectedFile))
                .andReturn().getResponse().getContentAsString();

        @SuppressWarnings("unchecked")
        HashMap<String, String> responseMap = new ObjectMapper().readValue(response, HashMap.class);
        String fileId = responseMap.get("id");

        this.mockMvc.perform(get("/api/files/" + fileId)
                        .with(httpBasic("user1", "password"))
                )
                .andExpect(status().isOk())
                .andExpect(content().string("test data"));
    }

    @Test
    void getFileById_whenFileNotExists_return404() throws Exception {
        this.mockMvc.perform(get("/api/files/1"))
                .andExpect(status().isNotFound());
    }
}