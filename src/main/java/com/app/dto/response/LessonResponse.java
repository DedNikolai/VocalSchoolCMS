package com.app.dto.response;

import com.app.dto.view.View;
import com.app.model.Discipline;
import com.app.model.LessonType;
import com.app.model.Room;
import com.fasterxml.jackson.annotation.JsonView;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;

@Data
public class LessonResponse {
  private Long id;
  private LessonDateResponse date;
  @ToString.Exclude
  @EqualsAndHashCode.Exclude
  @JsonView(View.Lesson.class)
  private TeacherResponse teacher;
  @ToString.Exclude
  @EqualsAndHashCode.Exclude
  @JsonView(View.Lesson.class)
  private StudentResponse student;
  private Room room;
  private Integer price;
  private Discipline discipline;
  private LessonType type;
}
