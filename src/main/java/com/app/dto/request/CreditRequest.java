package com.app.dto.request;

import lombok.Data;

import java.util.Date;

@Data
public class CreditRequest {
  private Long id;
  private LessonRequest lesson;
  private StudentRequest student;
  private TeacherRequest teacher;
  private Date lessonDate;
  private String time;
}
