package com.app.service;

import com.app.model.TransferLesson;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Date;
import java.util.List;

public interface TransferLessonService {
  Page<TransferLesson> getAllOrderByDate(Pageable pageable);

  TransferLesson getById(Long id);

  TransferLesson createTransferLesson(TransferLesson request);

  TransferLesson updateLesson(TransferLesson request, Long id);

  List<TransferLesson> findAllbyTransferDate(Date date);

  void deleteLesson(Long id);
}
