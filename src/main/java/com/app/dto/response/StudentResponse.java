package com.app.dto.response;

import com.app.dto.view.View;
import com.fasterxml.jackson.annotation.JsonView;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;

import java.util.HashSet;
import java.util.Set;

@Data
public class StudentResponse {
  private Long id;
  private String email;
  private String photoUrl;
  private String phone;
  private String firstName;
  private String lastName;
  private Integer age;
  @ToString.Exclude
  @EqualsAndHashCode.Exclude
  @JsonView(View.Student.class)
  private Set<AbonementResponse> abonements;
//  @ToString.ExcludeRes
//  @EqualsAndHashCode.Exclude
//  @JsonView(View.Student.class)
//  private Set<TeacherResponse> teachers;
//  @ToString.Exclude
//  @EqualsAndHashCode.Exclude
//  @JsonView(View.Student.class)
//  private Set<LessonResponse> lessons;
}
