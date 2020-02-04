package com.app.facade;

import com.app.dto.request.LoginRequest;
import com.app.dto.request.SignUpRequest;
import com.app.dto.response.JwtAuthenticationResponse;
import com.app.dto.response.UserResponse;
import com.app.model.User;
import com.app.service.UserService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class UserFacade {
  private final ModelMapper modelMapper;
  private final UserService userService;

  public UserResponse getUserById(Long id) {
    User user = userService.getUserById(id);
    return modelMapper.map(user, UserResponse.class);
  }

  public JwtAuthenticationResponse authenticateUser(LoginRequest loginRequest) {
    return userService.authenticateUser(loginRequest);
  }

  public UserResponse registerUser(SignUpRequest signUpRequest) {
    User user = userService.registerUser(signUpRequest);
    return modelMapper.map(user, UserResponse.class);
  }
}
