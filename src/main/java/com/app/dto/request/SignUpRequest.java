package com.app.dto.request;

import com.app.model.Role;
import lombok.Data;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.util.Set;

@Data
public class SignUpRequest {

  @NotBlank
  @Size(min = 4, max = 40)
  private String password;

  @NotBlank
  @Size(max = 40)
  @Email
  private String email;
  private Set<Role> roles;

}
