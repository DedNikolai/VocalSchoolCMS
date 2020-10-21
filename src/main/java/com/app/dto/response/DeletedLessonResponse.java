package com.app.dto.response;

import com.app.dto.request.LessonRequest;
import com.app.dto.request.StudentRequest;
import com.app.dto.request.TeacherRequest;
import com.app.dto.view.View;
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
  @ToString.Exclude
  @EqualsAndHashCode.Exclude
  @JsonView(View.DeletedLesson.class)
  private StudentResponse student;
  @ToString.Exclude
  @EqualsAndHashCode.Exclude
  @JsonView(View.DeletedLesson.class)
  private TeacherResponse teacher;
  private Date lessonDate;
  private String lessonTime;
  private String reason;
}
