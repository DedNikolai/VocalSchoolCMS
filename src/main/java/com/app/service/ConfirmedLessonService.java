package com.app.service;

import com.app.dto.response.ApiResponse;
import com.app.model.ConfirmedLesson;
import com.app.model.Teacher;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Date;
import java.util.List;
import java.util.Set;

public interface ConfirmedLessonService {
  ConfirmedLesson getLessonById(Long id);

  ApiResponse createLesson(ConfirmedLesson confirmedLesson);

  ApiResponse updateLesson(ConfirmedLesson confirmedLesson, Long id);

  ApiResponse deleteLesson(Long id);

  Page<ConfirmedLesson> findAllOrderByDate(Pageable pageable);

  List<ConfirmedLesson> findAllByTeacherNoPaid(Long teacherId);

  ApiResponse payConfirmedLesson(Long id);

  ApiResponse payAllConfirmedLessons(Long teacherId);

  Set<ConfirmedLesson> findAllByDate(Date startDate, Date endDate);
}
