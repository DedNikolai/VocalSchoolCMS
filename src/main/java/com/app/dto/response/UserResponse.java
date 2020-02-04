package com.app.dto.response;

import com.app.model.Role;
import lombok.Data;

import java.util.Set;

@Data
public class UserResponse {
  private Long id;
  private String email;
  private Set<Role> roles;
}
