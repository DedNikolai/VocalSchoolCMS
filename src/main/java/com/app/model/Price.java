package com.app.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name = "prices")
public class Price extends BaseEntiy {

  @Column(name = "discipline")
  @Enumerated(EnumType.STRING)
  private Discipline discipline;

  @Column(name = "price_value")
  private Integer priceValue;

  @Column(name = "lesson_type")
  @Enumerated(EnumType.STRING)
  private LessonType type;

  @ManyToOne
  @JoinColumn(name="teacher_id", nullable=false)
  private Teacher teacher;
}
