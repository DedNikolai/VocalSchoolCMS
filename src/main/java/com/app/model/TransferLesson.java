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

  @Enumerated(EnumType.ORDINAL)
  @Column(name = "room")
  private Room room;

  @Column(name = "lesson_date")
  @Temporal(TemporalType.DATE)
  private Date lessonDate;
}
