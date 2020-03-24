package com.app.dto.response;

import com.app.dto.view.View;
import com.app.model.Discipline;
import com.app.model.LessonDay;
import com.app.model.LessonType;
import com.app.model.Room;
import com.fasterxml.jackson.annotation.JsonView;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;

@Data
public class LessonResponse {
  private Long id;
//  @ToString.Exclude
//  @EqualsAndHashCode.Exclude
//  @JsonView(View.Lesson.class)
  private TeacherResponse teacher;
//  @ToString.Exclude
//  @EqualsAndHashCode.Exclude
//  @JsonView(View.Lesson.class)
  private StudentResponse student;
  private Room room;
  private Discipline discipline;
  private LessonType type;
  private LessonDay day;
  private Integer timeHour;
  private Integer timeMinutes;
}
