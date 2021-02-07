package com.app.facade;

import com.app.dto.request.AbonementRequest;
import com.app.dto.response.AbonementResponse;
import com.app.model.Abonement;
import com.app.service.AbonementService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Component;

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

  public void deleteAbonement(Long id) {
    abonementService.deleteAbonement(id);
  }

  public Page<AbonementResponse> findAll(Pageable pageable) {
    Page<Abonement> abonements = abonementService.findAll(pageable);
    return abonements.map(abonement -> modelMapper.map(abonement, AbonementResponse.class));
  }
}
