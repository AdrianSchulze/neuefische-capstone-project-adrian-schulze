package de.neuefische.backend.appuser;

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
class AppUserControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Test
    void createUser() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.post("/api/users/signup")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {
                                    "id": "1",
                                    "username": "user1",
                                    "password": "password",
                                    "role": ""
                                }
                                """))
                .andExpectAll(MockMvcResultMatchers.status().isOk(),
                        MockMvcResultMatchers.content()
                                .json("""
                                          {
                                            "id": "1",
                                            "username": "user1",
                                            "password": "",
                                            "role": "BASIC"
                                        }
                                        """, true));
    }

    @Test
    void createUser_whenAlreadyExists_ThrowConflict() throws Exception {
        createUser();
        mockMvc.perform(MockMvcRequestBuilders.post("/api/users/signup")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {
                                    "id": "1",
                                    "username": "user1",
                                    "password": "password",
                                    "role": ""
                                }
                                """))
                .andExpectAll(MockMvcResultMatchers.status().isConflict());
    }

    @Test
    void login() throws Exception {
        createUser();
        mockMvc.perform(MockMvcRequestBuilders.post("/api/users/login")
                .with(httpBasic("user1","password")))
                .andExpectAll(
                        MockMvcResultMatchers.status().isOk()
                );

    }

    @Test
    void loginWithoutUser_Forbidden() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.post("/api/users/login")
                        .with(httpBasic("user1","password")))
                .andExpectAll(
                        MockMvcResultMatchers.status().isUnauthorized()
                );

    }

    @Test
    void me() throws Exception {
        createUser();
        mockMvc.perform(MockMvcRequestBuilders.get("/api/users/me")
                        .with(httpBasic("user1","password")))
                .andExpectAll(
                        MockMvcResultMatchers.status().isOk());
    }

    @Test
    void meWithoutLogin_Forbidden() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.get("/api/users/me")
                        .with(httpBasic("user1","password")))
                .andExpectAll(
                        MockMvcResultMatchers.status().isUnauthorized()
                );
    }

    @Test
    void logout() throws Exception {
        createUser();
        mockMvc.perform(MockMvcRequestBuilders.get("/api/users/logout")
                        .with(httpBasic("user1","password")))
                .andExpectAll(
                        MockMvcResultMatchers.status().isOk()
                );
    }

    @Test
    void logout_Unautorized() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.get("/api/users/logout")
                        .with(httpBasic("user1","password")))
                .andExpectAll(
                        MockMvcResultMatchers.status().isUnauthorized()
                );
    }

}