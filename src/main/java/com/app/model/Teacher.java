package com.app.model;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.CascadeType;
import javax.persistence.CollectionTable;
import javax.persistence.Column;
import javax.persistence.ElementCollection;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@Entity
@Table(name = "taechers")
@Getter
@Setter
@NoArgsConstructor
public class Teacher extends BaseEntiy {

  @Column(name = "email")
  private String email;

  @Column(name = "photo")
  private String photoUrl;

  @Column(name = "phone")
  private String phone;

  @Column(name = "first_name")
  private String firstName;

  @Column(name = "last_name")
  private String lastName;

  @Column(name = "age")
  private Integer age;

  @ManyToMany(mappedBy = "teachers", fetch = FetchType.EAGER)
  private Set<Student> students;

  @OneToMany(mappedBy="teacher", fetch = FetchType.EAGER)
  @ToString.Exclude
  @EqualsAndHashCode.Exclude
  private Set<Lesson> lessons;

  @ElementCollection(fetch = FetchType.EAGER)
  @CollectionTable(name = "teacher_discipline", joinColumns = @JoinColumn(name = "teacher_id"))
  @Column(name = "discipline")
  @Enumerated(EnumType.STRING)
  private Set<Discipline> disciplines;

  @OneToMany(mappedBy = "teacher", fetch = FetchType.EAGER)
  @ToString.Exclude
  private Set<Price> prices;

  @OneToMany(mappedBy = "teacher")
  @ToString.Exclude
  @EqualsAndHashCode.Exclude
  private List<ConfirmedLesson> confirmedLessons = new ArrayList<>();

  @OneToMany(mappedBy = "teacher", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.EAGER)
  private Set<TeacherWorkTime> workTimes;

}
