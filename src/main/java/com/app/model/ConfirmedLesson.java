package com.app.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name = "confirmed_lesson")
public class ConfirmedLesson extends BaseEntiy {

  @Column(name = "price")
  private Integer price;

  @Column(name = "discipline")
  @Enumerated(EnumType.STRING)
  private Discipline discipline;

  @Column(name = "lesson_type")
  @Enumerated(EnumType.STRING)
  private LessonType type;

  @Enumerated(EnumType.STRING)
  @Column(name = "room")
  private Room room;

  @ManyToOne
  @JoinColumn(name="teacher_id")
  private Teacher teacher;

  @ManyToOne
  @JoinColumn(name="student_id")
  private Student student;

}
