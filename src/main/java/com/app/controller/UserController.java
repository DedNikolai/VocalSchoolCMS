package com.app.controller;

import com.app.dto.request.LoginRequest;
import com.app.dto.request.SignUpRequest;
import com.app.dto.response.UserResponse;
import com.app.facade.UserFacade;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

@RestController
@RequestMapping("api/v1")
@RequiredArgsConstructor
public class UserController {
  private final UserFacade userFacade;

  @PreAuthorize("hasAnyAuthority('SUPER_ADMIN', 'ADMIN')")
  @GetMapping("users/{id}")
  public ResponseEntity<UserResponse> getUserById(@PathVariable Long id) {
    UserResponse response = userFacade.getUserById(id);
    return ResponseEntity.ok(response);
  }

  @PostMapping("auth/signin")
  public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {
    return ResponseEntity.ok(userFacade.authenticateUser(loginRequest));
  }

  @PostMapping("auth/signup")
  public ResponseEntity<UserResponse> registerUser(@Valid @RequestBody SignUpRequest signUpRequest) {
    return ResponseEntity.ok(userFacade.registerUser(signUpRequest));
  }
}
