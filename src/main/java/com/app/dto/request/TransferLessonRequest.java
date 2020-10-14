package com.app.dto.request;

import com.app.model.Room;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;

import java.util.Date;

@Data
public class TransferLessonRequest {
  private Long id;
  private LessonRequest lesson;
  private Room room;
  @JsonFormat(pattern="yyyy-MM-dd")
  private Date lessonDate;
  private TeacherRequest teacher;
  @JsonFormat(pattern="yyyy-MM-dd")
  private Date transferDate;
  private String transferTime;
}
