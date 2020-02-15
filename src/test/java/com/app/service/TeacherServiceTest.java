package com.app.service;

import com.app.model.Teacher;
import com.app.repository.TeacherRepository;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RunWith(SpringRunner.class)
@SpringBootTest
public class TeacherServiceTest {

  @Autowired
  private TeacherService teacherService;

  @MockBean
  private TeacherRepository teacherRepository;

  private Teacher mockTeacher = new Teacher();
  private Teacher secondMockTeacher = new Teacher();

  @Before
  public void setUp() {
    mockTeacher.setId(1L);
    mockTeacher.setFirstName("Nick");
    mockTeacher.setEmail("nick@gmail.com");

    secondMockTeacher.setId(2L);
    secondMockTeacher.setFirstName("Steve");
    secondMockTeacher.setEmail("steve@gmail.com");
  }

  @Test
  public void verifyGetTeacherByIdTest() {
    Long expectedId = 1L;
    String expectedEmail = "nick@gmail.com";

    Mockito.when(teacherRepository.findById(expectedId)).thenReturn(Optional.of(mockTeacher));

    Teacher teacher = teacherService.getTeacherById(expectedId);
    Mockito.verify(teacherRepository).findById(expectedId);

    Assert.assertEquals(expectedEmail, teacher.getEmail());
    Assert.assertEquals(expectedId, teacher.getId());
  }

  @Test
  public void verifyCreateTeacherTest() {
    String expectedEmail = "nick@gmail.com";

    Mockito.when(teacherRepository.save(mockTeacher)).thenReturn(mockTeacher);
    Teacher teacher = teacherService.createTeacher(mockTeacher);

    Mockito.verify(teacherRepository).save(mockTeacher);

    Assert.assertEquals(expectedEmail, teacher.getEmail());
  }

  @Test
  public void verifyUpdateTeacherTest() {
    String expectedEmail = "test2@mail.com";
    Long expectedId = 1L;
    mockTeacher.setEmail(expectedEmail);

    Mockito.when(teacherRepository.save(mockTeacher)).thenReturn(mockTeacher);
    Mockito.when(teacherRepository.findById(expectedId)).thenReturn(Optional.of(mockTeacher));
    Teacher teacher = teacherService.updateTeacher(expectedId, mockTeacher);

    Mockito.verify(teacherRepository).save(mockTeacher);

    Assert.assertEquals(expectedEmail, teacher.getEmail());
    Assert.assertEquals(expectedId, teacher.getId());
  }

  @Test
  public void verifyDeleteTeacher() {
    Long expectedId = 1L;
    Mockito.when(teacherRepository.findById(expectedId)).thenReturn(Optional.of(mockTeacher));
    teacherService.deleteTeacher(expectedId);
    Mockito.verify(teacherRepository).findById(1L);
    Mockito.verify(teacherRepository).delete(mockTeacher);
  }

  @Test
  public void verifyGetAllTeachers() {
    int expectedSize= 2;
    List<Teacher> teachers = new ArrayList<>();
    teachers.add(mockTeacher);
    teachers.add(secondMockTeacher);

    Mockito.when(teacherRepository.findAll()).thenReturn(teachers);
    List<Teacher> allTeachers = teacherService.getAllTeachers();

    Mockito.verify(teacherRepository).findAll();
    Assert.assertEquals(expectedSize, allTeachers.size());
  }
}
