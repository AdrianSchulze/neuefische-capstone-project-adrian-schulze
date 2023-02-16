package de.neuefische.backend.metric;

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
class MetricControllerTest {

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
    void getAllMetrics() throws Exception {
        signup();
        mockMvc.perform(MockMvcRequestBuilders.get("/api/metrics")
                        .with(httpBasic("user1","password")))
                .andExpectAll(MockMvcResultMatchers.status().isOk());
    }

    @Test
    void getAllMetrics_WithoutLogin_IsUnauthorized() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.get("/api/metrics")
                        .with(httpBasic("user1","password")))
                .andExpectAll(MockMvcResultMatchers.status().isUnauthorized());
    }

    @Test
    void addMetrics_WithoutLogin_IsUnauthorized() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.post("/api/metrics")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {
                                   "id": "1",
                                   "channelId":"123",
                                   "date": "23112022",
                                   "impressions": 2,
                                   "clicks": 2,
                                   "cost": 2,
                                   "conversions": 2
                                }
                                """))
                .andExpectAll(MockMvcResultMatchers.status().isUnauthorized());
    }

    @Test
    void addMetrics() throws Exception {
        signup();

        mockMvc.perform(MockMvcRequestBuilders.post("/api/metrics")
                        .with(httpBasic("user1","password"))
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {
                                   "id": "1",
                                   "channelId":"123",
                                   "date": "23112022",
                                   "impressions": 2,
                                   "clicks": 2,
                                   "cost": 2,
                                   "conversions": 2
                                }
                                """))
                .andExpectAll(MockMvcResultMatchers.status().isOk(),
                        MockMvcResultMatchers.content()
                                .json("""
                                               {
                                                  "id": "1",
                                                  "channelId":"123",
                                                  "date": "23112022",
                                                  "impressions": 2,
                                                  "clicks": 2,
                                                  "cost": 2,
                                                  "conversions": 2
                                             }
                                             """, true));
    }

    @Test
    void getAllFilteredAndCalculatedMetricsByChannelId() throws Exception {
        addMetrics();
        mockMvc.perform(MockMvcRequestBuilders.get("/api/metrics/1")
                        .with(httpBasic("user1","password")))
                        .andExpectAll(MockMvcResultMatchers.status().isOk());
    }

    @Test
    void getAllFilteredAndCalculatedMetricsByChannelId_IfNotAuthorized_ThrowUnauthorized() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.get("/api/metrics/1")
                        .with(httpBasic("user1","password")))
                .andExpectAll(MockMvcResultMatchers.status().isUnauthorized());
    }
}