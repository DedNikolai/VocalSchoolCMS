package com.app.repository;

import com.app.model.Lesson;
import com.app.model.LessonDay;
import com.app.model.Room;
import com.app.model.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LessonRepository extends JpaRepository<Lesson, Long> {
  List<Lesson> findAllByStudentAndDeletedIsFalse(Student student);

  List<Lesson> findAllByDayAndDeletedIsFalseOrderByTime(LessonDay lessonDay);

  List<Lesson> findAllByDayAndDeletedIsFalse(LessonDay day);

  List<Lesson> findAllByDayAndRoomAndDeletedIsFalse(LessonDay day, Room room);

  List<Lesson> findAllByDeletedIsFalse();
}
