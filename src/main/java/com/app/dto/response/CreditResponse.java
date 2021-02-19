package com.app.dto.response;

import com.app.dto.view.View;
import com.fasterxml.jackson.annotation.JsonView;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;

import java.util.Date;

@Data
public class CreditResponse {
  private Long id;
  @ToString.Exclude
  @EqualsAndHashCode.Exclude
  @JsonView(View.Credit.class)
  private StudentResponse student;
  @ToString.Exclude
  @EqualsAndHashCode.Exclude
  @JsonView(View.Credit.class)
  private LessonResponse lesson;
  @ToString.Exclude
  @EqualsAndHashCode.Exclude
  @JsonView(View.Credit.class)
  private TeacherResponse teacher;
  private Date lessonDate;
  private String time;
}
