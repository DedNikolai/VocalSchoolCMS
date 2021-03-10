package com.app.model;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import java.util.Date;

@Table(name = "transfer_lessons")
@Entity
@Data
@NoArgsConstructor
public class TransferLesson extends BaseEntiy{

  @ManyToOne
  @JoinColumn(name="lesson_id")
  private Lesson lesson;

  @Enumerated(EnumType.STRING)
  @Column(name = "room")
  private Room room;

  @ManyToOne
  @JoinColumn(name = "teacher")
  @ToString.Exclude
  @EqualsAndHashCode.Exclude
  private Teacher teacher;

  @Column(name = "transfer_date")
  @Temporal(TemporalType.DATE)
  private Date transferDate;

  @Column(name = "lesson_date")
  @Temporal(TemporalType.DATE)
  private Date lessonDate;

  @Column(name = "transfer_time")
  private String transferTime;

  @ManyToOne
  @JoinColumn(name = "abonement")
  @ToString.Exclude
  @EqualsAndHashCode.Exclude
  private Abonement abonement;

  private Status status;

  @Column(name = "is_active")
  private Boolean isActive;

  @Column(name = "lesson_day")
  @Enumerated(EnumType.STRING)
  private LessonDay day;
}
