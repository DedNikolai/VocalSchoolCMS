package com.app.dto.request;

import com.app.model.Discipline;
import com.app.model.LessonType;
import com.app.model.Room;
import lombok.Data;

@Data
public class ConfirmedLessonRequest {
  private Long id;
  private Integer price;
  private Discipline discipline;
  private LessonType type;
  private Room room;
  private TeacherRequest teacher;
  private StudentRequest student;
}
