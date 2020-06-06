package com.app.dto.request;

import com.app.model.Discipline;
import com.app.model.LessonType;
import lombok.Data;

@Data
public class PriceRequest {
  private Long id;
  private Discipline discipline;
  private Integer priceValue;
  private LessonType type;
}
