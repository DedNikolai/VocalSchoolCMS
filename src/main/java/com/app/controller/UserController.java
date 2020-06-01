package com.app.controller;

import com.app.dto.request.LoginRequest;
import com.app.dto.request.SignUpRequest;
import com.app.dto.request.UserRequest;
import com.app.dto.response.UserResponse;
import com.app.facade.UserFacade;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("api/v1")
@RequiredArgsConstructor
public class UserController {
  private final UserFacade userFacade;

  @PreAuthorize("hasAuthority('SUPER_ADMIN')")
  @GetMapping("users/{id}")
  public ResponseEntity<UserResponse> getUserById(@PathVariable Long id) {
    UserResponse response = userFacade.getUserById(id);
    return ResponseEntity.ok(response);
  }

  @PreAuthorize("hasAuthority('SUPER_ADMIN')")
  @GetMapping("users")
  public ResponseEntity<List<UserResponse>> getAllUsers() {
    List<UserResponse> response = userFacade.getAllUsers();
    return ResponseEntity.ok(response);
  }

  @PostMapping("auth/signin")
  public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {
    return ResponseEntity.ok(userFacade.authenticateUser(loginRequest));
  }

  @PreAuthorize("hasAuthority('SUPER_ADMIN')")
  @PostMapping("auth/signup")
  public ResponseEntity<UserResponse> registerUser(@Valid @RequestBody SignUpRequest signUpRequest) {
    return ResponseEntity.ok(userFacade.registerUser(signUpRequest));
  }

  @GetMapping("users/current")
  public ResponseEntity<UserResponse> getCurrentUser() {
    return ResponseEntity.ok(userFacade.getCurrentUser());
  }

  @PreAuthorize("hasAuthority('SUPER_ADMIN')")
  @PutMapping("users/{id}")
  public ResponseEntity updateUser(@RequestBody UserRequest userRequest, @PathVariable Long id) {
    UserResponse userResponse = userFacade.updateUser(id, userRequest);
    return ResponseEntity.ok(userResponse);
  }

  @PreAuthorize("hasAuthority('SUPER_ADMIN')")
  @DeleteMapping("users/{id}")
  public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
    userFacade.deleteUser(id);
    return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
  }
}
