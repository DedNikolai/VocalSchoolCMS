package com.app.model;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name = "lessons")
@Data
@NoArgsConstructor
public class Lesson extends BaseEntiy {

  @Column(name = "lesson_date")
  private String lessonDate;

  @ManyToOne
  @JoinColumn(name="teacher_id", nullable=false)
  private Teacher teacher;

  @ManyToOne
  @JoinColumn(name="student_id", nullable=false)
  private Student student;

  @Enumerated(EnumType.STRING)
  @Column(name = "room")
  private Room room;

  @Column(name = "price")
  private Integer price;

  @Column(name = "discipline")
  @Enumerated(EnumType.STRING)
  private Discipline discipline;

  @Column(name = "lesson_type")
  @Enumerated(EnumType.STRING)
  private LessonType type;

}
