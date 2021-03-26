package com.app.controller;

import com.app.dto.request.StudentRequest;
import com.app.dto.response.StudentResponse;
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

import static org.junit.Assert.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@RunWith(SpringRunner.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.MOCK)
@AutoConfigureMockMvc
@Transactional
@WithMockUser(authorities = "SUPER_ADMIN")
public class StudentControllerTest {

  @Autowired
  private MockMvc mockMvc;

  @Autowired
  private StudentService studentService;

  @Autowired
  private TeacherService teacherService;

  @Autowired
  private ObjectMapper objectMapper;

  @Test
  public void getStudentById() throws Exception {
    Long expectedId = 1L;
    String expectedEmail = "student1@ukr.com";
    MvcResult result = mockMvc.perform(get("/api/v1/students/1"))
        .andReturn();
    String responseBody = result.getResponse().getContentAsString();
    StudentResponse response = objectMapper.readValue(responseBody, StudentResponse.class);
    assertEquals(expectedId, response.getId());
    assertEquals(expectedEmail, response.getEmail());
  }

  @Test
  public void updateStudentTest() throws Exception {
    Long id = 1L;
    String email = "chenged@gmail.com";

    StudentRequest studentRequest = new StudentRequest();
    studentRequest.setId(id);
    studentRequest.setEmail(email);

    String userJson = objectMapper.writeValueAsString(studentRequest);

    MvcResult response = this.mockMvc.perform(put("/api/v1/students/1")
        .content(userJson).contentType(MediaType.APPLICATION_JSON))
        .andExpect(status().isOk())
        .andReturn();

    StudentResponse studentResponse = objectMapper.readValue(response.getResponse().getContentAsString(), StudentResponse.class);

    assertEquals(email, studentResponse.getEmail());
    assertEquals(id, studentResponse.getId());
  }

  @Test
  public void createStudentTest() throws Exception {
    String email = "testEmail@gmail.com";
    String name = "Test";

    StudentRequest studentRequest = new StudentRequest();
    studentRequest.setEmail(email);
    studentRequest.setFirstName(name);
    String userJson = objectMapper.writeValueAsString(studentRequest);

    MvcResult result = this.mockMvc.perform(post("/api/v1/students")
        .content(userJson).contentType(MediaType.APPLICATION_JSON))
        .andReturn();

    StudentResponse studentResponse = objectMapper.readValue(result.getResponse().getContentAsString(), StudentResponse.class);

    assertNotNull(studentResponse.getId());
    assertEquals(email, studentResponse.getEmail());
  }

  @Test
  public void deleteUserTest() throws Exception {
    Long id = 1L;
    int expectedSize = 1;

    this.mockMvc.perform(delete("/api/v1/students/1")).andExpect(status().is(204));
//    assertEquals(expectedSize, teacherService.getTeacherById(id).getStudents().size());
//    assertEquals(0, teacherService.getTeacherById(2L).getStudents().size());
  }

  @Test
  public void getAllStudents() throws Exception {
    int expectedSize = 2;

    MvcResult result = mockMvc.perform(get("/api/v1/students?page=0&limit=20"))
        .andReturn();
    String responseBody = result.getResponse().getContentAsString();

    HashMap<String, Object> students = objectMapper.readValue(responseBody, new TypeReference<HashMap<String, Object>>(){});
    assertEquals(expectedSize, ((List)students.get("content")).size());
  }
}
