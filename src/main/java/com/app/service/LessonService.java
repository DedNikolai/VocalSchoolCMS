package com.app.service;

import com.app.dto.response.ApiResponse;
import com.app.model.Lesson;
import com.app.model.LessonDay;
import com.app.model.Teacher;

import java.util.Date;
import java.util.List;

public interface LessonService {
  List<Lesson> getLessonsByStudent(Long id);

  ApiResponse createLesson(Lesson lesson);

  ApiResponse deleteLesson(Long id);

  Lesson getLessonById(Long id);

  ApiResponse updateLesson(Lesson lesson, Long id);

  List<Lesson> getAllLessons();

  List<Lesson> getAllbyDay(Date date);

  List<Lesson> findAllbyLessonDay(String day);

  List<Lesson> getAllLessonsByDates(Date startDate, Date finishDate);

  List<Lesson> getAllLessonsByDatesAndTeacher(Date startDate, Date finishDate, Long teacherId);

  List<Lesson> findAllByTeacherAndLessonIsNotSingleAndDateNotEpire(Date date, Long teacherId);
}
