package com.app.controller;

import com.app.dto.request.CreditRequest;
import com.app.dto.response.ApiResponse;
import com.app.dto.response.CreditResponse;
import com.app.dto.view.View;
import com.app.facade.CreditFacade;
import com.fasterxml.jackson.annotation.JsonView;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;

@Controller
@RequestMapping("/api/v1/credits")
@PreAuthorize("hasAnyAuthority('SUPER_ADMIN, ADMIN')")
@RequiredArgsConstructor
public class CreditController {
  private final CreditFacade creditFacade;

  @GetMapping
  @JsonView(View.Credit.class)
  public ResponseEntity<Page<CreditResponse>> findAll(Pageable pageable) {
    Page<CreditResponse> response = creditFacade.findAll(pageable);
    return ResponseEntity.ok(response);
  }

  @GetMapping("student/{id}")
  @JsonView(View.Credit.class)
  public ResponseEntity<List<CreditResponse>> findStudentCredits(@PathVariable Long id) {
    List<CreditResponse> response = creditFacade.findAllStudentCredits(id);
    return ResponseEntity.ok(response);
  }

  @PostMapping
  @JsonView(View.Credit.class)
  public ResponseEntity<ApiResponse> createCredit(@RequestBody CreditRequest request) {
    ApiResponse response = creditFacade.createCredit(request);
    return ResponseEntity.ok(response);
  }

  @DeleteMapping("{id}")
  @JsonView(View.Credit.class)
  public ResponseEntity<ApiResponse> deleteCredit(@PathVariable Long id) {
    ApiResponse response = creditFacade.deleteCredit(id);
    return ResponseEntity.ok(response);
  }

}
