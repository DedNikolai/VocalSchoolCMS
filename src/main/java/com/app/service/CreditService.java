package com.app.service;

import com.app.dto.response.ApiResponse;
import com.app.model.ConfirmedLesson;
import com.app.model.Credit;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface CreditService {
  List<Credit> findAllStudentCredits(Long id);

  Page<Credit> findAll(Pageable pageable);

  ApiResponse deleteCredit(Long id);

  ApiResponse createCredit(ConfirmedLesson confirmedLesson);
}
