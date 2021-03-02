package com.app.dto.request;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;

import java.util.Date;

@Data
public class DeletedLessonRequest {
  private Long id;
  private LessonRequest lesson;
  @JsonFormat(pattern="yyyy-MM-dd")
  private Date lessonDate;
  private String reason;
  private StudentRequest student;
  private TeacherRequest teacher;
}
