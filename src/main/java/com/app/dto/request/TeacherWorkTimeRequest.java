package com.app.dto.request;

import com.app.model.LessonDay;
import lombok.Data;

@Data
public class TeacherWorkTimeRequest {
  private Long id;
  private LessonDay day;
  private String startTime;
  private String endTime;
}
