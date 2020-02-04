package com.app.dto.request;

import lombok.Data;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

@Data
public class SignUpRequest {

  @NotBlank
  @Size(min = 4, max = 40)
  private String password;

  @NotBlank
  @Size(max = 40)
  @Email
  private String email;

}
