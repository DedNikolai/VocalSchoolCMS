package com.app.service;

import com.app.exeption.ResourceNotFoundException;
import com.app.model.Abonement;
import com.app.model.Lesson;
import com.app.model.Student;
import com.app.model.Teacher;
import com.app.repository.LessonRepository;
import com.app.repository.StudentRepository;
import com.app.repository.TeacherRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import java.util.Date;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class SudentServiceImpl implements StudentService {
  private final StudentRepository studentRepository;
  private final TeacherRepository teacherRepository;
  private final LessonRepository lessonRepository;

  @Override
  public Student getStudntById(Long id) {
    Student student = studentRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Student", "id", id));
    Set<Abonement> abonements = student.getAbonements();
    student.setAbonements(abonements);
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
    studentRepository.delete(student);
  }

  @Override
  public Page<Student> getAllStudents(String params, Pageable pageable) {
    if (!StringUtils.hasText(params)) {
      return studentRepository.findAll(pageable);
    }
    Page<Student> students = studentRepository.findAllByParams(params, pageable);
    return students;
  }

  @Override
  public Set<Student> findAllByDates(Date startDate, Date endDate) {
    Set<Student> students = studentRepository.findAllByDates(startDate, endDate);
    return students;
  }
}
