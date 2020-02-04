package com.app.model;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import java.util.Date;

@Table(name = "transfer_lessons")
@Entity
@Data
@NoArgsConstructor
public class TransferLesson extends BaseEntiy{

  @Column(name = "date")
  private Date date;

  @OneToOne(cascade = CascadeType.ALL)
  @JoinColumn(name = "lesson_id", referencedColumnName = "id")
  private Lesson lesson;

  @Enumerated(EnumType.ORDINAL)
  @Column(name = "room")
  private Room room;
}
