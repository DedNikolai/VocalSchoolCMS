package com.app.service;

import com.app.model.TeacherWorkTime;

import java.util.List;

public interface TeacherWorkTimeService {
  List<TeacherWorkTime> getAllByTeacher(Long teacherId);

  TeacherWorkTime getById(Long id);

  TeacherWorkTime create(Long teacherId, TeacherWorkTime teacherWorkTime);

  TeacherWorkTime update(Long id, TeacherWorkTime teacherWorkTime);

  void delete(Long id);
}
