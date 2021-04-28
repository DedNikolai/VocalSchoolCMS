package com.app.dto.request;

import lombok.Data;

@Data
public class PasswordRequest {
  private String oldPassword;
  private String token;
  private String newPassword;
}
