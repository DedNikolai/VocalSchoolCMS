package com.app.dto.request;

import com.app.model.Discipline;
import com.app.model.LessonDay;
import com.app.model.LessonType;
import com.app.model.Room;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;

import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import java.sql.Time;
import java.util.Date;

@Data
public class LessonRequest {
  private Long id;
  private TeacherRequest teacher;
  private StudentRequest student;
  private Integer price;
  private Discipline discipline;
  private LessonType type;
  private LessonDay day;
  private String time;
  private Room room;
  private Integer duration;
  private Boolean isSingleLesson;
  private Date lessonStartDate;
  private Date lessonFinishDate;
}
