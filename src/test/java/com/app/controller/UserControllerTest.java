package com.app.controller;

import com.app.dto.request.UserRequest;
import com.app.dto.response.UserResponse;
import com.app.model.Role;
import com.app.service.UserService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashSet;
import java.util.Set;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertNull;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@RunWith(SpringRunner.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.MOCK)
@AutoConfigureMockMvc
@Transactional
@WithMockUser(authorities = "SUPER_ADMIN")
public class UserControllerTest {

  @Autowired
  private MockMvc mockMvc;

  @Autowired
  private UserService userService;

  @Autowired
  private ObjectMapper objectMapper;

  @Autowired
  private ModelMapper modelMapper;

  @MockBean
  private PasswordEncoder passwordEncoder;

  @Test
  public void getUserById() throws Exception {
    Long expectedId = 1L;
    String expectedEmail = "nikolai.blashchuk@gmail.com";
    MvcResult result = mockMvc.perform(get("/api/v1/users/1"))
        .andReturn();
    String responseBody = result.getResponse().getContentAsString();
    UserResponse user = objectMapper.readValue(responseBody, UserResponse.class);
    assertEquals(expectedId, user.getId());
    assertEquals(expectedEmail, user.getEmail());
  }

  @Test
  @WithMockUser(value = "nikolai.blashchuk@gmail.com")
  public void getCurrentUser() throws Exception {
    Long id = 1L;
    String email = "nikolai.blashchuk@gmail.com";

    MvcResult response = this.mockMvc.perform(get("/api/v1/users/current"))
        .andExpect(status().isOk())
        .andReturn();

    UserResponse responseUser = objectMapper
        .readValue(response.getResponse().getContentAsString(), UserResponse.class);

    assertNotNull(responseUser);
    assertEquals(email, responseUser.getEmail());
    assertEquals(id, responseUser.getId());
  }

  @Test
  public void updateUserTest() throws Exception {
    Long id = 1L;
    String email = "chenged@gmail.com";

    UserRequest userRequest = new UserRequest();
    userRequest.setId(id);
    userRequest.setEmail(email);

    String userJson = objectMapper.writeValueAsString(userRequest);

    MvcResult response = this.mockMvc.perform(put("/api/v1/users/1")
        .content(userJson).contentType(MediaType.APPLICATION_JSON))
        .andExpect(status().isOk())
        .andReturn();

    UserResponse userResponse = objectMapper.readValue(response.getResponse().getContentAsString(), UserResponse.class);

    assertEquals(email, userResponse.getEmail());
    assertEquals(id, userResponse.getId());
  }

  @Test
  public void createUserTest() throws Exception {
    String email = "testEmail@gmail.com";
    String password = "123456";
    Set<Role> roleSet = new HashSet<>();
    roleSet.add(Role.ADMIN);

    UserRequest userRequest = new UserRequest();
    userRequest.setEmail(email);
    userRequest.setRoles(roleSet);
    userRequest.setPassword(password);
    String userJson = objectMapper.writeValueAsString(userRequest);

    MvcResult result = this.mockMvc.perform(post("/api/v1/users")
        .content(userJson).contentType(MediaType.APPLICATION_JSON))
        .andReturn();

    UserResponse response = objectMapper.readValue(result.getResponse().getContentAsString(), UserResponse.class);

    assertNotNull(response.getId());
    assertEquals(email, response.getEmail());
  }

  @Test
  public void deleteUserTest() throws Exception {
    Long id = 2L;

    this.mockMvc.perform(delete("/api/v1/users/2"));
    assertNull(userService.getUserById(id));
  }
}
