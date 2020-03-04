package com.app.service;

import com.app.model.Student;
import com.app.repository.StudentRepository;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.mockito.Mockito.mock;

@RunWith(SpringRunner.class)
@SpringBootTest
public class StudentServiceTest {

  @Autowired
  private StudentService studentService;

  @MockBean
  private StudentRepository studentRepository;

  private Student mockStudent = new Student();
  private Student secondMockStudent = new Student();

  @Before
  public void setUp() {
    mockStudent.setId(1L);
    mockStudent.setFirstName("Nick");
    mockStudent.setEmail("nick@gmail.com");

    secondMockStudent.setId(2L);
    secondMockStudent.setFirstName("Steve");
    secondMockStudent.setEmail("steve@gmail.com");
  }

  @Test
  public void verifyGetStudentByIdTest() {
    Long expectedId = 1L;
    String expectedEmail = "nick@gmail.com";

    Mockito.when(studentRepository.findById(expectedId)).thenReturn(Optional.of(mockStudent));

    Student student = studentService.getStudntById(expectedId);
    Mockito.verify(studentRepository).findById(expectedId);

    Assert.assertEquals(expectedEmail, student.getEmail());
    Assert.assertEquals(expectedId, student.getId());
  }

  @Test
  public void verifyCreateStudentTest() {
    String expectedEmail = "nick@gmail.com";

    Mockito.when(studentRepository.save(mockStudent)).thenReturn(mockStudent);
    Student student = studentService.createStudent(mockStudent);

    Mockito.verify(studentRepository).save(mockStudent);

    Assert.assertEquals(expectedEmail, student.getEmail());
  }

  @Test
  public void verifyUpdateStudentTest() {
    String expectedEmail = "test2@mail.com";
    Long expectedId = 1L;
    mockStudent.setEmail(expectedEmail);

    Mockito.when(studentRepository.save(mockStudent)).thenReturn(mockStudent);
    Mockito.when(studentRepository.findById(expectedId)).thenReturn(Optional.of(mockStudent));
    Student student = studentService.updateStudent(expectedId, mockStudent);

    Mockito.verify(studentRepository).save(mockStudent);

    Assert.assertEquals(expectedEmail, student.getEmail());
    Assert.assertEquals(expectedId, student.getId());
  }

  @Test
  public void verifyDeleteStudent() {
    Long expectedId = 1L;
    Mockito.when(studentRepository.findById(expectedId)).thenReturn(Optional.of(mockStudent));
    studentService.deleteStudent(expectedId);
    Mockito.verify(studentRepository).findById(1L);
    Mockito.verify(studentRepository).delete(mockStudent);
  }

  @Test
  public void verifyGetAllStudent() {
    int expectedSize= 2;
    List<Student> students = new ArrayList<>();
    students.add(mockStudent);
    students.add(secondMockStudent);
    Pageable pageable = mock(Pageable.class);
    Page<Student> studentsList = new PageImpl<>(students);

    Mockito.when(studentRepository.findAll(pageable)).thenReturn(studentsList);
    Page<Student> studentResponse = studentService.getAllStudents(null, pageable);

    Mockito.verify(studentRepository).findAll(pageable);
    Assert.assertEquals(expectedSize, studentResponse.getContent().size());
  }
}
