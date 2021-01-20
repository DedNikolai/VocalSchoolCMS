package com.app.service;

import com.app.dto.request.LoginRequest;
import com.app.dto.request.PasswordRequest;
import com.app.dto.request.SignUpRequest;
import com.app.dto.response.ApiResponse;
import com.app.dto.response.JwtAuthenticationResponse;
import com.app.model.User;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

public interface UserService {
  User getUserById(Long id);

  User updateUser(Long id, User user);

  void deleteUser(Long id);

  JwtAuthenticationResponse authenticateUser(LoginRequest loginRequest);

  User registerUser(SignUpRequest signUpRequest);

  User getCurrentUser();

  List<User> getAllUsers();

  ApiResponse resetPassword(HttpServletRequest request, String email);

  ApiResponse changePassword(PasswordRequest passwordRequest);
}
