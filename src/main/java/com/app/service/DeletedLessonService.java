package com.app.service;

import com.app.model.DeletedLesson;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface DeletedLessonService {
  DeletedLesson getLessonById(Long id);

  DeletedLesson createLesson(DeletedLesson deletedLesson);

  DeletedLesson updateLesson(DeletedLesson deletedLesson, Long id);

  void deleteLesson(Long id);

  Page<DeletedLesson> findAllOrderByDate(Pageable pageable);
}