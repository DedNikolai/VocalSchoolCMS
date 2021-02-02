package com.app.model;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name = "abonements")
@Data
@NoArgsConstructor
public class Abonement extends BaseEntiy {

  @ManyToOne
  @JoinColumn(name="student_id")
  @ToString.Exclude
  @EqualsAndHashCode.Exclude
  private Student student;

  @ManyToOne
  @JoinColumn(name="teacher_id")
  @ToString.Exclude
  @EqualsAndHashCode.Exclude
  private Teacher teacher;

  private Integer quantity;

  private Integer price;

  @Enumerated(EnumType.STRING)
  private Discipline discipline;

}
