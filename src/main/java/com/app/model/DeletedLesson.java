package com.app.model;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import java.util.Date;

@Entity
@Table(name = "deleted_lesson")
@Data
@NoArgsConstructor
public class DeletedLesson extends BaseEntiy {

  @ManyToOne
  @JoinColumn(name="lesson_id")
  @ToString.Exclude
  @EqualsAndHashCode.Exclude
  private Lesson lesson;

  @Column(name = "lesson_date")
  @Temporal(TemporalType.DATE)
  private Date lessonDate;

  @Column(name = "reason")
  private String reason;

  @ManyToOne
  @JoinColumn(name = "abonement")
  @ToString.Exclude
  @EqualsAndHashCode.Exclude
  private Abonement abonement;

  @Column(name = "is_used", columnDefinition = "boolean default false")
  private Boolean isUsed = false;
}
