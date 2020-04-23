package com.app.dto.response;

import com.app.model.LessonDay;
import lombok.Data;

@Data
public class TeacherWorkTimeResponse {
  private Long id;
  private LessonDay day;
  private String startTime;
  private String endTime;
}
