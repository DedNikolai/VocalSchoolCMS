package com.app.dto.request;

import com.app.model.Role;

import java.util.List;

public class UserRequest {
  private Long id;
  private String password;
  private String email;
  private List<Role> roles;
}
