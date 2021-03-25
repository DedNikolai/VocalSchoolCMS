package com.app.controller;

import com.app.dto.request.StudentRequest;
import com.app.dto.request.TeacherRequest;
import com.app.dto.response.StudentResponse;
import com.app.dto.response.TeacherResponse;
import com.app.repository.TeacherRepository;
import com.app.service.StudentService;
import com.app.service.TeacherService;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.List;

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
public class TeacherControllerTest {

  @Autowired
  private MockMvc mockMvc;

  @Autowired
  private TeacherRepository teacherRepository;

  @Autowired
  private StudentService studentService;

  @Autowired
  private ObjectMapper objectMapper;

  @Test
  public void getTeacherById() throws Exception {
    Long expectedId = 1L;
    String expectedEmail = "oks.mal@ukr.com";
    MvcResult result = mockMvc.perform(get("/api/v1/teachers/1"))
        .andReturn();
    String responseBody = result.getResponse().getContentAsString();
    StudentResponse response = objectMapper.readValue(responseBody, StudentResponse.class);
    assertEquals(expectedId, response.getId());
    assertEquals(expectedEmail, response.getEmail());
  }

  @Test
  public void updateTeacherTest() throws Exception {
    Long id = 1L;
    String email = "chenged@gmail.com";

    TeacherRequest teacherRequest = new TeacherRequest();
    teacherRequest.setId(id);
    teacherRequest.setEmail(email);

    String userJson = objectMapper.writeValueAsString(teacherRequest);

    MvcResult response = this.mockMvc.perform(put("/api/v1/teachers/1")
        .content(userJson).contentType(MediaType.APPLICATION_JSON))
        .andExpect(status().isOk())
        .andReturn();

    TeacherResponse teacherResponse = objectMapper.readValue(response.getResponse().getContentAsString(), TeacherResponse.class);

    assertEquals(email, teacherResponse.getEmail());
    assertEquals(id, teacherResponse.getId());
  }

  @Test
  public void createTeacherTest() throws Exception {
    String email = "testEmail@gmail.com";
    String name = "Test";

    TeacherRequest teacherRequest = new TeacherRequest();
    teacherRequest.setEmail(email);
    teacherRequest.setFirstName(name);
    String userJson = objectMapper.writeValueAsString(teacherRequest);

    MvcResult result = this.mockMvc.perform(post("/api/v1/teachers")
        .content(userJson).contentType(MediaType.APPLICATION_JSON))
        .andReturn();

    TeacherResponse teacherResponse = objectMapper.readValue(result.getResponse().getContentAsString(), TeacherResponse.class);

    assertNotNull(teacherResponse.getId());
    assertEquals(email, teacherResponse.getEmail());
  }

  @Test
  public void deleteTeacherTest() throws Exception {
    Long id = 1L;
    int expectedSize = 1;

    this.mockMvc.perform(delete("/api/v1/teachers/1")).andExpect(status().is(204));
    assertNull(teacherRepository.findById(id).orElse(null));
//    assertEquals(expectedSize, studentService.getStudntById(id).getTeachers().size());
//    assertEquals(0, studentService.getStudntById(2L).getTeachers().size());
  }

  @Test
  public void getAllTeachers() throws Exception {
    int expectedSize = 2;

    MvcResult result = mockMvc.perform(get("/api/v1/teachers"))
        .andReturn();
    String responseBody = result.getResponse().getContentAsString();

    List<TeacherResponse> teachers = objectMapper.readValue(responseBody, new TypeReference<List<TeacherResponse>>(){});
    assertEquals(expectedSize, teachers.size());
  }
}
