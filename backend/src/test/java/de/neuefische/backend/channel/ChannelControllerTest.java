package de.neuefische.backend.channel;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.httpBasic;

@SpringBootTest
@AutoConfigureMockMvc
@DirtiesContext(classMode = DirtiesContext.ClassMode.BEFORE_EACH_TEST_METHOD)
class ChannelControllerTest {

    @Autowired
    private MockMvc mockMvc;

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
                        MockMvcResultMatchers.content()
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
    void createChannel() throws Exception {
        signup();
        mockMvc.perform(MockMvcRequestBuilders.post("/api/channels")
                        .contentType(MediaType.APPLICATION_JSON)
                        .with(httpBasic("user1","password"))
                        .content("""
                                {
                                    "id": "1",
                                    "createdBy": "12345",
                                    "channel": "google",
                                    "name": "GoogleAds"
                                }
                                """))
                .andExpectAll(MockMvcResultMatchers.status().isOk(),
                        MockMvcResultMatchers.content()
                                .json("""
                                          {
                                            "id": "1",
                                            "createdBy": "12345",
                                            "channel": "google",
                                            "name": "GoogleAds"
                                        }
                                        """, true));
    }

    @Test
    void getAllChannels() throws Exception {
        signup();

        mockMvc.perform(MockMvcRequestBuilders.get("/api/channels")
                        .with(httpBasic("user1","password")))
                .andExpectAll(MockMvcResultMatchers.status().isOk());
    }

    @Test
    void getAllChannels_whenNotLoggedIn_Unauthorized() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.get("/api/channels")
                        .with(httpBasic("user1","password")))
                        .andExpectAll(MockMvcResultMatchers.status().isUnauthorized());
    }

    @Test
    void deleteChannel() throws Exception {
        createChannel();

        mockMvc.perform(MockMvcRequestBuilders.delete("/api/channels/1")
                        .with(httpBasic("user1","password")))
                        .andExpectAll(MockMvcResultMatchers.status().isOk());
    }

    @Test
    void deleteChannel_whenNotLoggedIn_Unauthorized() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.get("/api/channels/1")
                        .with(httpBasic("user1","password")))
                .andExpectAll(MockMvcResultMatchers.status().isUnauthorized());
    }

}