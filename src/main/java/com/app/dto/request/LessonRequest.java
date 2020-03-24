package com.app.dto.request;

import com.app.model.Discipline;
import com.app.model.LessonDay;
import com.app.model.LessonType;
import com.app.model.Room;
import lombok.Data;

@Data
public class LessonRequest {
  private Long id;
  private TeacherRequest teacher;
  private StudentRequest student;
  private Integer price;
  private Discipline discipline;
  private LessonType type;
  private LessonDay day;
  private Integer timeHour;
  private Integer timeMinutes;
  private Room room;
}
