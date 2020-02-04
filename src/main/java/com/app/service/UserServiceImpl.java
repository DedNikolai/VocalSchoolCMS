package com.app.service;

import com.app.dto.request.LoginRequest;
import com.app.dto.request.SignUpRequest;
import com.app.dto.response.JwtAuthenticationResponse;
import com.app.exeption.AppException;
import com.app.model.Role;
import com.app.model.User;
import com.app.repository.UserRepository;
import com.app.security.jwt.JwtTokenProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {
  private final UserRepository userRepository;
  private final AuthenticationManager authenticationManager;
  private final PasswordEncoder passwordEncoder;
  private final JwtTokenProvider tokenProvider;

  @Override
  public User getUserById(Long id) {
    User user = userRepository.findById(id).orElse(null);
    return user;
  }

  @Override
  public User createUser(User user) {
    return userRepository.save(user);
  }

  @Override
  public User updateUser(Long id, User user) {
    user.setId(id);
    return userRepository.save(user);
  }

  @Override
  public void deleteUser(Long id) {
    User user = userRepository.findById(id).orElse(null);
    userRepository.delete(user);
  }

  @Override
  public JwtAuthenticationResponse authenticateUser(LoginRequest loginRequest) {
    UsernamePasswordAuthenticationToken token = new UsernamePasswordAuthenticationToken(
        loginRequest.getEmail(),
        loginRequest.getPassword()
    );
    Authentication authentication = authenticationManager.authenticate(token);

    SecurityContextHolder.getContext().setAuthentication(authentication);
    String jwt = tokenProvider.generateToken(authentication);
    return new JwtAuthenticationResponse(jwt);
  }

  @Override
  public User registerUser(SignUpRequest signUpRequest) {
    if (userRepository.existsByEmail(signUpRequest.getEmail())) {
      throw new AppException("Email Address already in use!");
    }

    User user = new User();
    user.setEmail(signUpRequest.getEmail());
    user.setPassword(passwordEncoder.encode(signUpRequest.getPassword()));
    Set<Role> roles = new HashSet<>();
    roles.add(Role.TEACHER);
    user.setRoles(roles);

    User registeredUser = userRepository.save(user);
    return registeredUser;
  }
}
