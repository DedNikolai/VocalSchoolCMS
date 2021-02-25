package com.app.model;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "lessons")
@Data
@NoArgsConstructor
public class Lesson extends BaseEntiy {

  @ManyToOne
  @JoinColumn(name="teacher_id")
  @ToString.Exclude
  @EqualsAndHashCode.Exclude
  private Teacher teacher;

  @ManyToOne
  @JoinColumn(name="student_id")
  @ToString.Exclude
  @EqualsAndHashCode.Exclude
  private Student student;

  @Enumerated(EnumType.STRING)
  @Column(name = "room")
  private Room room;

  @Column(name = "lesson_time")
  private String time;

  @Column(name = "duration")
  private Integer duration;

  @Column(name = "discipline")
  @Enumerated(EnumType.STRING)
  private Discipline discipline;

  @Column(name = "lesson_type")
  @Enumerated(EnumType.STRING)
  private LessonType type;

  @Column(name = "lesson_day")
  @Enumerated(EnumType.STRING)
  private LessonDay day;

  @Column(columnDefinition = "boolean default false")
  private Boolean deleted = false;

  private Status status;

  @Column(name = "is_test", columnDefinition = "boolean default false")
  private Boolean isTestLesson = false;

  @Column(name = "lesson_date")
  @Temporal(TemporalType.DATE)
  private Date lessonDate;

  @Column(name = "is_active")
  private Boolean isActive = true;

}
