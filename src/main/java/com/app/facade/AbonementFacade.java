package com.app.facade;

import com.app.dto.request.AbonementRequest;
import com.app.dto.response.AbonementResponse;
import com.app.dto.response.ApiResponse;
import com.app.model.Abonement;
import com.app.service.AbonementService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Component;

import java.util.Date;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Component
@RequiredArgsConstructor
public class AbonementFacade {
  private final ModelMapper modelMapper;
  private final AbonementService abonementService;

  public AbonementResponse getById(Long id) {
    Abonement abonement = abonementService.getById(id);
    return modelMapper.map(abonement, AbonementResponse.class);
  }

  public AbonementResponse createAbonement(AbonementRequest request) {
    Abonement abonement = modelMapper.map(request, Abonement.class);
    Abonement createdAbonement = abonementService.createAbonement(abonement);
    return modelMapper.map(createdAbonement, AbonementResponse.class);
  }

  public AbonementResponse updateAbonement(AbonementRequest request, Long id) {
    Abonement abonement = modelMapper.map(request, Abonement.class);
    Abonement updatedAbonement = abonementService.updateAbonement(abonement, id);
    return modelMapper.map(updatedAbonement, AbonementResponse.class);
  }

  public ApiResponse deleteAbonement(Long id) {
     return abonementService.deleteAbonement(id);
  }

  public Page<AbonementResponse> findAll(Pageable pageable) {
    Page<Abonement> abonements = abonementService.findAll(pageable);
    return abonements.map(abonement -> modelMapper.map(abonement, AbonementResponse.class));
  }

  public List<AbonementResponse> getAllActiveAbonementsByStudenr(Long studentId) {
    List<Abonement> abonements = abonementService.findAllByStudent(studentId);
    return abonements.stream().map(abonement -> modelMapper.map(abonement, AbonementResponse.class)).collect(Collectors.toList());
  }

  public Set<AbonementResponse> findAllByDates(Date startDate, Date endDate) {
    Set<Abonement> abonements = abonementService.findAllByDates(startDate, endDate);
    return abonements.stream().map(abonement -> modelMapper.map(abonement, AbonementResponse.class)).collect(Collectors.toSet());
  }
 }
