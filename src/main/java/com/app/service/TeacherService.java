package com.app.service;

import com.app.model.Discipline;
import com.app.model.Teacher;

import java.util.List;

public interface TeacherService {
  Teacher getTeacherById(Long id);

  List<Teacher> getAllTeachers();

  Teacher createTeacher(Teacher teacher);

  Teacher updateTeacher(Long id, Teacher teacher);

  List<Teacher> finAllByDiscipline(String discipline);

  void deleteTeacher(Long id);
}
