package com.app.dto.response;

import com.app.dto.view.View;
import com.app.model.Status;
import com.fasterxml.jackson.annotation.JsonView;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;

import java.util.Date;

@Data
public class ConfirmedLessonResponse {
  private Long id;
  private Date createdDate;
  private Integer price;
  @ToString.Exclude
  @EqualsAndHashCode.Exclude
  @JsonView(View.ConfirmedLesson.class)
  private LessonResponse lesson;
  @ToString.Exclude
  @EqualsAndHashCode.Exclude
  @JsonView(View.ConfirmedLesson.class)
  private TeacherResponse teacher;
  private Date lessonDate;
  private Boolean isPaid;
}
