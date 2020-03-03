package com.app.service;

import com.app.model.Student;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface StudentService {
  Student getStudntById(Long id);

  Student createStudent(Student student);

  Student updateStudent(Long id, Student student);

  void deleteStudent(Long id);

  Page<Student> getAllStudents(String params, Pageable pageable);
}
