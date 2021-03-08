package com.app.service;

import com.app.dto.response.ApiResponse;
import com.app.model.ConfirmedLesson;
import com.app.model.Student;
import com.app.model.TransferLesson;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Date;
import java.util.List;

public interface TransferLessonService {
  Page<TransferLesson> getAllOrderByDate(Pageable pageable);

  TransferLesson getById(Long id);

  ApiResponse createTransferLesson(TransferLesson request);

  ApiResponse updateLesson(TransferLesson request, Long id);

  ApiResponse confirmTransferLesson(ConfirmedLesson confirmedLesson, Long trasferLessonId);

  List<TransferLesson> findAllbyTransferDate(Date date);

  ApiResponse deleteLesson(Long id);

  List<TransferLesson> findAllStudentActiveLessons(Long studentId);

  ApiResponse rejectTransferLesson(Long id);
}
