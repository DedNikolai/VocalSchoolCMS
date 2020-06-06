package com.app.controller;

import com.app.dto.request.PriceRequest;
import com.app.dto.response.PriceResponse;
import com.app.facade.PriceFacade;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/api/v1/prices")
@RequiredArgsConstructor
public class PriceController {
  private final PriceFacade priceFacade;

  @PostMapping("teacher/{id}")
  @PreAuthorize("hasAnyAuthority('SUPER_ADMIN, ADMIN')")
  public ResponseEntity<PriceResponse> createPrice(@RequestBody PriceRequest request, @PathVariable Long id) {
    PriceResponse response = priceFacade.createPrice(request, id);
    return new ResponseEntity<>(response, HttpStatus.CREATED);
  }

  @PutMapping("{id}/teacher/{teacherId}")
  @PreAuthorize("hasAnyAuthority('SUPER_ADMIN, ADMIN')")
  public ResponseEntity<PriceResponse> updatePrice(@RequestBody PriceRequest request, @PathVariable Long id, @PathVariable Long teacherId) {
    PriceResponse response = priceFacade.updatePrice(id, request, teacherId);
    return ResponseEntity.ok(response);
  }

  @DeleteMapping("{id}")
  @PreAuthorize("hasAnyAuthority('SUPER_ADMIN, ADMIN')")
  public ResponseEntity<Void> deletePrice(@PathVariable Long id) {
    priceFacade.deletePrice(id);
    return ResponseEntity.noContent().build();
  }

}
