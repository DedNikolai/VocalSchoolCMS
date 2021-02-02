package com.app.controller;

import com.app.dto.request.AbonementRequest;
import com.app.dto.response.AbonementResponse;
import com.app.dto.view.View;
import com.app.facade.AbonementFacade;
import com.fasterxml.jackson.annotation.JsonView;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/api/v1/abonements")
@PreAuthorize("hasAnyAuthority('SUPER_ADMIN, ADMIN')")
@RequiredArgsConstructor
public class AbonementController {
  private final AbonementFacade abonementFacade;

  @GetMapping
  @JsonView(View.Abonement.class)
  public ResponseEntity<Page<AbonementResponse>> findAll(Pageable pageable) {
    Page<AbonementResponse> response = abonementFacade.findAll(pageable);
    return ResponseEntity.ok(response);
  }

  @GetMapping("{id}")
  @JsonView(View.Abonement.class)
  public ResponseEntity<AbonementResponse> findById(@PathVariable Long id) {
    AbonementResponse response = abonementFacade.getById(id);
    return ResponseEntity.ok(response);
  }

  @PostMapping
  @JsonView(View.Abonement.class)
  public ResponseEntity<AbonementResponse> createAbonement(@RequestBody AbonementRequest request) {
    AbonementResponse response = abonementFacade.createAbonement(request);
    return new ResponseEntity<>(response, HttpStatus.CREATED);
  }

  @PutMapping("{id}")
  @JsonView(View.Abonement.class)
  public ResponseEntity<AbonementResponse> updateAbonement(@RequestBody AbonementRequest request, @PathVariable Long id) {
   AbonementResponse response = abonementFacade.updateAbonement(request, id);
   return ResponseEntity.ok(response);
  }

  @DeleteMapping("{id}")
  @JsonView(View.Abonement.class)
  public ResponseEntity<Void> deleteAbonement(@PathVariable Long id) {
    abonementFacade.deleteAbonement(id);
    return ResponseEntity.noContent().build();
  }
}
