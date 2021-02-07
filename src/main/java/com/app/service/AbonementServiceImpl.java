package com.app.service;

import com.app.exeption.ResourceNotFoundException;
import com.app.model.Abonement;
import com.app.repository.AbonementRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AbonementServiceImpl implements AbonementService{
  private final AbonementRepository abonementRepository;


  @Override
  public Abonement getById(Long id) {
    Abonement abonement = abonementRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Abonement", "id", id));
    return abonement;
  }

  @Override
  public Abonement createAbonement(Abonement abonement) {
    return abonementRepository.save(abonement);
  }

  @Override
  public Abonement updateAbonement(Abonement abonement, Long id) {
    Abonement abonementFromDb = abonementRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Abonement", "id", id));
    abonement.setId(abonementFromDb.getId());
    return abonementRepository.save(abonement);

  }

  @Override
  public void deleteAbonement(Long id) {
    Abonement abonement = abonementRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Abonement", "id", id));
    abonementRepository.delete(abonement);
  }

  @Override
  public Page<Abonement> findAll(Pageable pageable) {
    return abonementRepository.findAllByOrderByCreatedDateDesc(pageable);
  }

}
