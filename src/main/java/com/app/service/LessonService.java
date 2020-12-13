package com.app.service;

import com.app.model.Lesson;
import com.app.model.LessonDay;

import java.util.Date;
import java.util.List;

public interface LessonService {
  List<Lesson> getLessonsByStudent(Long id);

  Lesson createLesson(Lesson lesson);

  Lesson deleteLesson(Long id);

  Lesson getLessonById(Long id);

  Lesson updateLesson(Lesson lesson, Long id);

  List<Lesson> getAllLessons();

  List<Lesson> getAllbyDay(Date date);

  List<Lesson> findAllbyLessonDay(String day);
}
