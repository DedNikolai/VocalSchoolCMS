package com.app.dto.request;

import com.app.model.Abonement;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;

import java.util.Date;

@Data
public class DeletedLessonRequest {
  private Long id;
  private LessonRequest lesson;
  private Date lessonDate;
  private String reason;
  private Boolean isUsed;
}
