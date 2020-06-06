package com.app.dto.response;

import com.app.model.Discipline;
import com.app.model.LessonType;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;

@Data
public class PriceResponse {
  private Long id;
  private Discipline discipline;
  private Integer priceValue;
  private LessonType type;
}
