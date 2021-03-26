package com.app.dto.response;

import com.app.dto.request.LessonRequest;
import com.app.dto.request.StudentRequest;
import com.app.dto.request.TeacherRequest;
import com.app.dto.view.View;
import com.app.model.Abonement;
import com.fasterxml.jackson.annotation.JsonView;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;

import java.util.Date;

@Data
public class DeletedLessonResponse {
  private Long id;
  @ToString.Exclude
  @EqualsAndHashCode.Exclude
  @JsonView(View.DeletedLesson.class)
  private LessonResponse lesson;
  private Date lessonDate;
  private String reason;
  @ToString.Exclude
  @EqualsAndHashCode.Exclude
  @JsonView(View.DeletedLesson.class)
  private Abonement abonement;
  private Boolean isUsed;
}
