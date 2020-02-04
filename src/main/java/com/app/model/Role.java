package com.app.model;

import org.springframework.security.core.GrantedAuthority;

public enum Role implements GrantedAuthority {
  SUPER_ADMIN,
  ADMIN,
  TEACHER;

  @Override
  public String getAuthority() {
    return this.toString();
  }
}
