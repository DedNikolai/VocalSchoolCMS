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
    Set<Abonement> abonements = student.getAbonements().stream().filter(abonement -> abonement.getIsActive()).collect(Collectors.toSet());
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
    List<Teacher> teachers = teacherRepository.findAllByStudentsContains(student);
    List<Lesson> lessons = lessonRepository.findAllByStudentOrderByLessonStartDateDesc(student);
    lessons.stream().forEach(lesson -> {
      lesson.setStudent(null);
    });
    teachers.stream().forEach(teacher -> {
      teacher.getStudents().remove(student);
    });
    lessonRepository.saveAll(lessons);
    teacherRepository.saveAll(teachers);
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
}
