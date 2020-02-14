package com.app.service;

import com.app.exeption.ResourceNotFoundException;
import com.app.model.Student;
import com.app.model.Teacher;
import com.app.repository.StudentRepository;
import com.app.repository.TeacherRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class SudentServiceImpl implements StudentService {
  private final StudentRepository studentRepository;
  private final TeacherRepository teacherRepository;

  @Override
  public Student getStudntById(Long id) {
    Student student = studentRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Student", "id", id));
    return student;
  }

  @Override
  public Student createStudent(Student student) {
    return studentRepository.save(student);
  }

  @Override
  public Student updateStudent(Long id, Student student) {
    Student studentFromDb = studentRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Student", "id", id));
    student.setId(studentFromDb.getId());
    return studentRepository.save(student);
  }

  @Override
  public void deleteStudent(Long id) {
    Student student = studentRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Student", "id", id));
    List<Teacher> teachers = teacherRepository.findAllByStudentsContains(student);
    teachers.stream().forEach(teacher -> {
      teacher.getStudents().remove(student);
    });
    teacherRepository.saveAll(teachers);
    studentRepository.delete(student);
  }

  @Override
  public Page<Student> getAllStudents(Pageable pageable) {
    Page<Student> students = studentRepository.findAll(pageable);
    return students;
  }
}
