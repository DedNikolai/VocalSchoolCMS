package com.app.model;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;
import javax.persistence.Table;
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

  @Column(name = "pay_balance")
  private Integer payBalance;

  @ManyToMany
  @JoinTable(name = "students_teachers",
      joinColumns = {@JoinColumn(name = "student_id")},
      inverseJoinColumns = {@JoinColumn(name = "teacher_id")})
  private Set<Teacher> teachers;

  @OneToMany(mappedBy="student")
  private Set<Lesson> lessons;

  @OneToMany(mappedBy = "student")
  private Set<ConfirmedLesson> confirmedLessons;

}
