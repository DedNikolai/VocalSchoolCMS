package com.app.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;

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

  private Integer quantity;

  private Integer price;

  @Enumerated(EnumType.STRING)
  private Discipline discipline;

  @OneToMany(mappedBy="abonement", fetch = FetchType.EAGER, cascade = CascadeType.ALL)
  @ToString.Exclude
  @EqualsAndHashCode.Exclude
  @JsonIgnore
  private Set<ConfirmedLesson> confirmedLessons = new HashSet<>();

//  @OneToMany(mappedBy="abonement", fetch = FetchType.EAGER, cascade = CascadeType.ALL)
//  @ToString.Exclude
//  @EqualsAndHashCode.Exclude
//  private Set<TransferLesson> transferLessons;

  @OneToMany(mappedBy="abonement", fetch = FetchType.EAGER, cascade = CascadeType.ALL)
  @ToString.Exclude
  @EqualsAndHashCode.Exclude
  @JsonIgnore
  private Set<DeletedLesson> deletedLessons;

  @Column(name = "transfered_quantity")
  private Integer transferedQuantity;

  @Column(name = "used_quantity")
  private Integer usedQuantity;
}
