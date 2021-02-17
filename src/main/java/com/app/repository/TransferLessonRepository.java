package com.app.repository;

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
  List<TransferLesson> findAllByLessonDate(@Temporal(TemporalType.DATE)Date date);

  Page<TransferLesson> findAllByOrderByCreatedDateAsc(Pageable pageable);

  List<TransferLesson> findAllByTransferDate(@Temporal(TemporalType.DATE)Date date);

  List<TransferLesson> findAllByIsActiveTrue();
}
