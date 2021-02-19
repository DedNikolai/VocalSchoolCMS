package com.app.facade;

import com.app.dto.request.CreditRequest;
import com.app.dto.response.ApiResponse;
import com.app.dto.response.CreditResponse;
import com.app.model.Credit;
import com.app.service.CreditService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
@RequiredArgsConstructor
public class CreditFacade {
  private final CreditService creditService;
  private final ModelMapper modelMapper;

  public List<CreditResponse> findAllStudentCredits(Long studentId) {
    List<Credit> credits = creditService.findAllStudentCredits(studentId);
    return credits.stream().map(credit -> modelMapper.map(credit, CreditResponse.class)).collect(Collectors.toList());
  }

  public Page<CreditResponse> findAll(Pageable pageable) {
    Page<Credit> credits = creditService.findAll(pageable);
    return credits.map(credit -> modelMapper.map(credit, CreditResponse.class));
  }

  public ApiResponse deleteCredit(Long id) {
    ApiResponse response = creditService.deleteCredit(id);
    return response;
  }

  public ApiResponse createCredit(CreditRequest creditRequest) {
    Credit credit = modelMapper.map(creditRequest, Credit.class);
    return creditService.createCredit(credit);
  }
}
