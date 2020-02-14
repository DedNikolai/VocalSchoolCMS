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

@Entity
@Table(name = "lessons")
@Data
@NoArgsConstructor
public class Lesson extends BaseEntiy {

  @ManyToOne
  @JoinColumn(name="lesson_date", nullable=false)
  @ToString.Exclude
  @EqualsAndHashCode.Exclude
  private LessonDate date;

  @ManyToOne
  @JoinColumn(name="teacher_id", nullable=false)
  @ToString.Exclude
  @EqualsAndHashCode.Exclude
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
