package com.app.repository;

import com.app.model.Abonement;
import com.app.model.ConfirmedLesson;
import com.app.model.Lesson;
import com.app.model.Teacher;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Temporal;
import org.springframework.stereotype.Repository;

import javax.persistence.TemporalType;
import java.util.Date;
import java.util.List;

@Repository
public interface ConfirmedLessonRepository extends JpaRepository<ConfirmedLesson, Long> {
  Page<ConfirmedLesson> findAllByOrderByCreatedDateDesc(Pageable pageable);

  List<ConfirmedLesson> findAllByLessonDateAndLesson(@Temporal(TemporalType.DATE)Date date, Lesson lesson);

  List<ConfirmedLesson> findAllByTeacherAndIsPaidFalse(Teacher teacher);

  List<ConfirmedLesson> findAllByLessonDate(@Temporal(TemporalType.DATE)Date date);

  List<ConfirmedLesson> findAllByLesson(Lesson lesson);

  List<ConfirmedLesson> findAllByAbonement(Abonement abonement);
}
