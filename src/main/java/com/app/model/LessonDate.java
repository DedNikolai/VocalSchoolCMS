package com.app.model;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "lesson_date")
@Data
@NoArgsConstructor
public class LessonDate extends BaseEntiy {

  @Column(name = "lesson_day")
  private Integer day;

  @Column(name = "lesson_hour")
  private Integer hour;

  @OneToMany(mappedBy = "date")
  @ToString.Exclude
  @EqualsAndHashCode.Exclude
  private Set<Lesson> lessons = new HashSet<>();
}
