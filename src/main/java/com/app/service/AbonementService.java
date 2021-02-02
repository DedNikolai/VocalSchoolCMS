package com.app.service;

import com.app.model.Abonement;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface AbonementService {
  Abonement getById(Long id);

  Abonement createAbonement(Abonement abonement);

  Abonement updateAbonement(Abonement abonement, Long id);

  void deleteAbonement(Long id);

  Page<Abonement> findAll(Pageable pageable);
}
