package com.app.repository;

import com.app.model.Lesson;
import com.app.model.LessonDay;
import com.app.model.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LessonRepository extends JpaRepository<Lesson, Long> {
  List<Lesson> findAllByStudent(Student student);

  List<Lesson> findAllByDayOrderByTime(LessonDay lessonDay);

  List<Lesson> findAllByDay(LessonDay day);
}
