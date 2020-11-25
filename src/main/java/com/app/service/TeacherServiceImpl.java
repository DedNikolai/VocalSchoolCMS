package com.app.service;

import com.app.exeption.ResourceNotFoundException;
import com.app.model.Discipline;
import com.app.model.Student;
import com.app.model.Teacher;
import com.app.repository.StudentRepository;
import com.app.repository.TeacherRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class TeacherServiceImpl implements TeacherService{
  private final TeacherRepository teacherRepository;
  private final StudentRepository studentRepository;

  @Override
  public Teacher getTeacherById(Long id) {
    Teacher teacher = teacherRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Teacher", "id", id));
    return teacher;
  }

  @Override
  public List<Teacher> getAllTeachers() {
    List<Teacher> teachers = teacherRepository.findAll();
    return teachers;
  }

  @Override
  public Teacher createTeacher(Teacher teacher) {
    return teacherRepository.save(teacher);
  }

  @Override
  public Teacher updateTeacher(Long id, Teacher teacher) {
    Teacher teacherFromDb = getTeacherById(id);
    teacher.setId(teacherFromDb.getId());
    return teacherRepository.save(teacher);
  }

  @Override
  public List<Teacher> finAllByDiscipline(String discipline) {
    List<Teacher> teachers = teacherRepository.findByDisciplinesContains(Discipline.valueOf(discipline));
    return teachers;
  }

  @Override
  public void deleteTeacher(Long id) {
    Teacher teacher = getTeacherById(id);
    List<Student> students = studentRepository.findAllByTeachersContains(teacher);
    students.stream().forEach(student -> {
      student.getTeachers().remove(teacher);
    });
    studentRepository.saveAll(students);
    teacherRepository.delete(teacher);
  }
}
