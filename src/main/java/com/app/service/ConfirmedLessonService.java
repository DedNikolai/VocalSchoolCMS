package com.app.service;

import com.app.dto.response.ApiResponse;
import com.app.model.ConfirmedLesson;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface ConfirmedLessonService {
  ConfirmedLesson getLessonById(Long id);

  ApiResponse createLesson(ConfirmedLesson confirmedLesson);

  ConfirmedLesson updateLesson(ConfirmedLesson confirmedLesson, Long id);

  void deleteLesson(Long id);

  Page<ConfirmedLesson> findAllOrderByDate(Pageable pageable);
}
