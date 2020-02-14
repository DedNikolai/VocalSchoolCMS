package com.app.dto.request;

import lombok.Data;

import java.util.Set;

@Data
public class LessonDateRequest {
  private Long id;
  private Integer day;
  private Integer hour;
  private Set<LessonRequest> lessons;
}
