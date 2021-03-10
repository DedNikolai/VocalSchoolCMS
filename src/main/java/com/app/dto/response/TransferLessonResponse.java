package com.app.dto.response;

import com.app.dto.view.View;
import com.app.model.LessonDay;
import com.app.model.Room;
import com.app.model.Status;
import com.fasterxml.jackson.annotation.JsonView;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;

import java.util.Date;

@Data
public class TransferLessonResponse {
  private Long id;
  @ToString.Exclude
  @EqualsAndHashCode.Exclude
  @JsonView(View.TransferLesson.class)
  private LessonResponse lesson;
  private Room room;
  private Date lessonDate;
  @ToString.Exclude
  @EqualsAndHashCode.Exclude
  @JsonView(View.TransferLesson.class)
  private TeacherResponse teacher;
  private Date transferDate;
  private String transferTime;
  private Status status;
  private Boolean isActive;
  private LessonDay day;
}
