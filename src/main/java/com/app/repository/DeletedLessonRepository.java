package com.app.repository;

import com.app.model.DeletedLesson;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Temporal;
import org.springframework.stereotype.Repository;

import javax.persistence.TemporalType;
import java.util.Date;
import java.util.List;

@Repository
public interface DeletedLessonRepository extends JpaRepository<DeletedLesson, Long> {
  Page<DeletedLesson> findAllByOrderByCreatedDateAsc(Pageable pageable);

  List<DeletedLesson> findAllByLessonDate(@Temporal(TemporalType.DATE) Date date);
}
