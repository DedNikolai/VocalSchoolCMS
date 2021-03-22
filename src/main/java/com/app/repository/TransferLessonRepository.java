package com.app.repository;

import com.app.model.Lesson;
import com.app.model.LessonDay;
import com.app.model.TransferLesson;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Temporal;
import org.springframework.stereotype.Repository;

import javax.persistence.TemporalType;
import java.util.Date;
import java.util.List;

@Repository
public interface TransferLessonRepository extends JpaRepository<TransferLesson, Long> {
  List<TransferLesson> findAllByLessonDateAndLesson(@Temporal(TemporalType.DATE)Date date, Lesson lesson);

  Page<TransferLesson> findAllByOrderByCreatedDateAsc(Pageable pageable);

  List<TransferLesson> findAllByTransferDateAndIsActiveTrue(@Temporal(TemporalType.DATE)Date date);

  List<TransferLesson> findAllByIsActiveTrue();

  List<TransferLesson> findAllByDayAndIsActiveTrue(LessonDay day);
}
