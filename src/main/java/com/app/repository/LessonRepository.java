package com.app.repository;

import com.app.model.*;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;

@Repository
public interface LessonRepository extends JpaRepository<Lesson, Long> {
  List<Lesson> findAllByStudentOrderByLessonStartDateDesc(Student student);

  List<Lesson> findAllByDayOrderByTime(LessonDay lessonDay);

  List<Lesson> findAllByDay(LessonDay day);


  @Query("select l from Lesson l where " +
      "(l.lessonStartDate <= :startDate and (l.lessonFinishDate >= :finishDate or l.lessonFinishDate is null))" +
      "or (l.lessonStartDate >= :startDate and l.lessonFinishDate <= :finishDate) " +
      "or (l.lessonStartDate <= :startDate and l.lessonFinishDate <= :finishDate and l.lessonFinishDate >= :startDate and l.isSingleLesson = false) " +
      "or (l.lessonStartDate >= :startDate and l.lessonStartDate <= :finishDate and (l.lessonFinishDate >= :finishDate or l.lessonFinishDate is null))")
  List<Lesson> findAllByDates(
      @Param("startDate") Date startDate, @Param("finishDate") Date finishDate);

  @Query("select l from Lesson l where (l.lessonFinishDate >= :startDate or l.lessonFinishDate is null) and l.day = :day")
  List<Lesson> findAllByLessonFinishDateIsNotExpire(
      @Param("startDate") Date startDate, @Param("day") LessonDay day);

  @Query("select l from Lesson l where " +
      "((l.lessonStartDate <= :startDate and (l.lessonFinishDate >= :finishDate or l.lessonFinishDate is null))" +
      "or (l.lessonStartDate >= :startDate and l.lessonFinishDate <= :finishDate) " +
      "or (l.lessonStartDate <= :startDate and l.lessonFinishDate <= :finishDate and l.lessonFinishDate >= :startDate and l.isSingleLesson = false) " +
      "or (l.lessonStartDate >= :startDate and l.lessonStartDate <= :finishDate and (l.lessonFinishDate >= :finishDate or l.lessonFinishDate is null)))" +
      "and l.teacher = :teacher")
  List<Lesson> findAllByDatesAndTeacher(
      @Param("startDate") Date startDate, @Param("finishDate") Date finishDate, @Param("teacher") Teacher teacher);

  @Query("select l from Lesson l where (l.lessonFinishDate >= :expireDate or l.lessonFinishDate is null) " +
      "and l.isSingleLesson = false and l.teacher = :teacher")
  List<Lesson> findAllByTeacherAndLessonIsNotSingleAndDateNotEpire(
      @Param("expireDate") Date expireDate, @Param("teacher") Teacher teacher);

  Lesson findFirstByDeletedLessonsContains(DeletedLesson lesson);

}
