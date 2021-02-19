package com.app.model;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "students")
@Data
@NoArgsConstructor
public class Student extends BaseEntiy {

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

  @ManyToMany(fetch = FetchType.EAGER)
  @JoinTable(name = "students_teachers",
      joinColumns = {@JoinColumn(name = "student_id")},
      inverseJoinColumns = {@JoinColumn(name = "teacher_id")})
  @ToString.Exclude
  @EqualsAndHashCode.Exclude
  private Set<Teacher> teachers = new HashSet<>();

  @OneToMany(mappedBy="student", fetch = FetchType.EAGER, cascade = CascadeType.ALL)
  @ToString.Exclude
  @EqualsAndHashCode.Exclude
  private Set<Lesson> lessons = new HashSet<>();

  @OneToMany(mappedBy = "student", fetch = FetchType.EAGER)
  @ToString.Exclude
  @EqualsAndHashCode.Exclude
  private Set<Abonement> abonements;

  @OneToMany(mappedBy = "student", fetch = FetchType.EAGER)
  @ToString.Exclude
  @EqualsAndHashCode.Exclude
  private Set<Credit> credits;

//  @OneToMany(mappedBy = "student")
//  @ToString.Exclude
//  @EqualsAndHashCode.Exclude
//  private Set<ConfirmedLesson> confirmedLessons;

}
