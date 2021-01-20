package com.app.service;

import com.app.dto.request.LoginRequest;
import com.app.dto.request.PasswordRequest;
import com.app.dto.request.SignUpRequest;
import com.app.dto.response.ApiResponse;
import com.app.dto.response.JwtAuthenticationResponse;
import com.app.exeption.AppException;
import com.app.exeption.ResourceNotFoundException;
import com.app.model.PasswordResetToken;
import com.app.model.User;
import com.app.repository.PasswordResetTokenRepository;
import com.app.repository.UserRepository;
import com.app.security.jwt.JwtTokenProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.context.MessageSource;
import org.springframework.core.env.Environment;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import java.util.Calendar;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {
  private final UserRepository userRepository;
  private final AuthenticationManager authenticationManager;
  private final PasswordEncoder passwordEncoder;
  private final JwtTokenProvider tokenProvider;
  private final PasswordResetTokenRepository passwordResetTokenRepository;
  private final JavaMailSender mailSender;
  private final MessageSource messages;
  private final Environment env;

  @Override
  public User getUserById(Long id) {
    User user = userRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("User", "id", id));
    return user;
  }

  @Override
  public User updateUser(Long id, User user) {
    User userFromDb = userRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("User", "id", id));
    user.setId(userFromDb.getId());
    user.setPassword(userFromDb.getPassword());
    return userRepository.save(user);
  }

  @Override
  public void deleteUser(Long id) {
    User user = userRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("User", "id", id));
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
    user.setRoles(signUpRequest.getRoles());
    User registeredUser = userRepository.save(user);
    return registeredUser;
  }

  @Override
  public User getCurrentUser() {
    Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
    return userRepository.findByEmail(authentication.getName()).orElse(null);
  }

  @Override
  public List<User> getAllUsers() {
    return userRepository.findAll();
  }

  @Override
  public ApiResponse resetPassword(HttpServletRequest request, String email) {
    User user = userRepository.findByEmail(email).orElse(null);

    if (user == null) {
      return new ApiResponse(false, "invalid email");
    }

    String token = UUID.randomUUID().toString();
    PasswordResetToken passwordResetToken = createPasswordResetTokenForUser(user, token);

    mailSender.send(constructResetTokenEmail(getAppUrl(request), passwordResetToken.getToken(), passwordResetToken.getUser()));

    return new ApiResponse(true, "We send the reset password instruction to your email");
  }

  public PasswordResetToken createPasswordResetTokenForUser(User user, String token) {
    PasswordResetToken myToken = new PasswordResetToken(token, user);
    return passwordResetTokenRepository.save(myToken);
  }

  @Override
  public ApiResponse changePassword(PasswordRequest passwordRequest) {
    final PasswordResetToken passToken = passwordResetTokenRepository.findByToken(passwordRequest.getToken());
    List<PasswordResetToken> tokens = passwordResetTokenRepository.findAll();
    String result = !isTokenFound(passToken) ? "invalidToken"
        : isTokenExpired(passToken) ? "expired"
        : null;

    if(result != null) {
      return new ApiResponse(false, result);
    }

    User user = passToken.getUser();
    if (user != null) {
      changeUserPassword(user, passwordRequest.getNewPassword());
    }
    return new ApiResponse(true, "Password was changed");
  }

  private SimpleMailMessage constructResetTokenEmail(
    String contextPath, String token, User user) {
    String url = contextPath + "/user/changePassword?token=" + token;
//    String message = "To complete the password reset process, please click here: ";
    String message = "To complete the password reset process, copy this code: ";
    return constructEmail("Reset Password", message + " \r\n" + token, user);
  }

  private SimpleMailMessage constructEmail(String subject, String body,
                                           User user) {
    SimpleMailMessage email = new SimpleMailMessage();
    email.setSubject(subject);
    email.setText(body);
    email.setTo(user.getEmail());
    email.setFrom("soloists.academy@gmail.com");
    return email;
  }

  private String getAppUrl(HttpServletRequest request) {
    return "http://localhost:3000/admin/reset-password";
//    return "http://" + request.getServerName() + ":" + request.getServerPort() + request.getContextPath();
  }

  private String isValidPasswordResetToken(String token) {
    final PasswordResetToken passToken = passwordResetTokenRepository.findByToken(token);
    String result = !isTokenFound(passToken) ? "invalidToken"
        : isTokenExpired(passToken) ? "expired"
        : null;

    if(result != null) {
      return result;
    }

    return passToken.getToken();
  }

  public String validatePasswordResetToken(String token) {
    final PasswordResetToken passToken = passwordResetTokenRepository.findByToken(token);

    return !isTokenFound(passToken) ? "invalidToken"
        : isTokenExpired(passToken) ? "expired"
        : null;
  }

  private boolean isTokenFound(PasswordResetToken passToken) {
    return passToken != null;
  }

  private boolean isTokenExpired(PasswordResetToken passToken) {
    final Calendar cal = Calendar.getInstance();
    return passToken.getExpiryDate().before(cal.getTime());
  }

  public void changeUserPassword(User user, String password) {
    user.setPassword(passwordEncoder.encode(password));
    userRepository.save(user);
  }
}
