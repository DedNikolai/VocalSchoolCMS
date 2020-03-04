package com.app.facade;

import com.app.dto.request.StudentRequest;
import com.app.dto.response.StudentResponse;
import com.app.model.Student;
import com.app.service.StudentService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class StudentFacade {
  private final ModelMapper modelMapper;
  private final StudentService studentService;

  public StudentResponse getById(Long id) {
    Student student = studentService.getStudntById(id);
    return modelMapper.map(student, StudentResponse.class);
  }

  public StudentResponse cretaeStudent(StudentRequest studentRequest) {
    Student student = modelMapper.map(studentRequest, Student.class);
    Student createdStudent = studentService.createStudent(student);
    return modelMapper.map(createdStudent, StudentResponse.class);
  }

  public StudentResponse updateStudent(Long id, StudentRequest studentRequest) {
    Student student = modelMapper.map(studentRequest, Student.class);
    Student updatedStudent = studentService.updateStudent(id, student);
    return modelMapper.map(updatedStudent, StudentResponse.class);
  }

  public void deleteStudent(Long id) {
    studentService.deleteStudent(id);
  }

  public Page<StudentResponse> getAllStudents(String params, Pageable pageable) {
    Page<Student> students = studentService.getAllStudents(params, pageable);
    Page<StudentResponse> studentsList = students.map(student -> modelMapper.map(student, StudentResponse.class));
    return studentsList;
  }
}
