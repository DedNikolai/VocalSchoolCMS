package com.app.dto.request;

import com.app.model.Discipline;
import com.app.model.LessonType;
import com.app.model.Room;
import lombok.Data;

@Data
public class LessonRequest {
  private Long id;
  private LessonDateRequest date;
  private TeacherRequest teacher;
  private StudentRequest student;
  private Room room;
  private Integer price;
  private Discipline discipline;
  private LessonType type;
}
