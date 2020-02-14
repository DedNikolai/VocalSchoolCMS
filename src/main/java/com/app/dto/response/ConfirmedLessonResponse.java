package com.app.dto.response;

import com.app.model.Discipline;
import com.app.model.LessonType;
import com.app.model.Room;
import lombok.Data;

@Data
public class ConfirmedLessonResponse {
  private Long id;
  private Integer price;
  private Discipline discipline;
  private LessonType type;
  private Room room;
}
