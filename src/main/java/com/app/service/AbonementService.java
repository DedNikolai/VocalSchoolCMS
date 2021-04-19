package com.app.service;

import com.app.dto.response.ApiResponse;
import com.app.model.Abonement;
import com.app.model.Student;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Date;
import java.util.List;
import java.util.Set;

public interface AbonementService {
  Abonement getById(Long id);

  Abonement createAbonement(Abonement abonement);

  Abonement updateAbonement(Abonement abonement, Long id);

  ApiResponse deleteAbonement(Long id);

  Page<Abonement> findAll(Pageable pageable);

  List<Abonement> findAllByStudent(Long studentId);

  Set<Abonement> findAllByDates(Date startDate, Date endDate);
}
