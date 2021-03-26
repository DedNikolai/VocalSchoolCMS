package com.app.dto.request;

import lombok.Data;

import java.util.Date;

@Data
public class ConfirmedLessonRequest {
  private Long id;
  private Date createdDate;
  private Integer price;
  private LessonRequest lesson;
  private TeacherRequest teacher;
  private Date lessonDate;
  private Boolean isPaid;
}
