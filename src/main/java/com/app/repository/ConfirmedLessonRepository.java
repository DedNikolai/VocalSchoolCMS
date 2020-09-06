package com.app.repository;

import com.app.model.ConfirmedLesson;
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
  Page<ConfirmedLesson> findAllByOrderByCreatedDateAsc(Pageable pageable);

  List<ConfirmedLesson> findAllByLessonDate(@Temporal(TemporalType.DATE)Date date);
}
