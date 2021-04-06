package com.app.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
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

  @Column(name = "parent")
  private String parent;

  @Column(name = "age")
  private Integer age;

  @OneToMany(mappedBy="student", cascade = CascadeType.ALL)
  @ToString.Exclude
  @EqualsAndHashCode.Exclude
  @JsonIgnore
  private Set<Lesson> lessons = new HashSet<>();

  @OneToMany(mappedBy = "student", fetch = FetchType.EAGER)
  @ToString.Exclude
  @EqualsAndHashCode.Exclude
  @JsonIgnore
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
