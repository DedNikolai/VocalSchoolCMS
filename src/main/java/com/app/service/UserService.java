package com.app.service;

import com.app.dto.request.LoginRequest;
import com.app.dto.request.SignUpRequest;
import com.app.dto.response.JwtAuthenticationResponse;
import com.app.model.User;

public interface UserService {
  User getUserById(Long id);

  User createUser(User user);

  User updateUser(Long id, User user);

  void deleteUser(Long id);

  JwtAuthenticationResponse authenticateUser(LoginRequest loginRequest);

  User registerUser(SignUpRequest signUpRequest);
}
