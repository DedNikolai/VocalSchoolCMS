package com.app.dto.request;

import com.app.model.Role;
import lombok.Data;

import java.util.Set;

@Data
public class UserRequest {
  private Long id;
  private String password;
  private String email;
  private Set<Role> roles;
}
