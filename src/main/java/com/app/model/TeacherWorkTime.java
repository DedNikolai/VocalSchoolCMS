package com.app.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name = "teacher_worktime")
@Getter
@Setter
@NoArgsConstructor
public class TeacherWorkTime extends BaseEntiy {
  @Column(name = "lesson_day")
  @Enumerated(EnumType.STRING)
  private LessonDay day;

  @Column(name = "start_time")
  private String startTime;

  @Column(name = "end_time")
  private String endTime;

  @ManyToOne
  @JoinColumn(name = "teacher")
  @JsonBackReference
  @ToString.Exclude
  @EqualsAndHashCode.Exclude
  private Teacher teacher;
}
