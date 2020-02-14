package com.app.dto.request;

import com.app.model.Discipline;
import com.app.model.LessonType;

public class PriceRequest {
  private Long id;
  private Discipline discipline;
  private Integer priceValue;
  private LessonType type;
  private TeacherRequest teacher;
}
