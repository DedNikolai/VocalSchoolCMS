package com.app.dto.response;

import com.app.dto.view.View;
import com.app.model.Discipline;
import com.fasterxml.jackson.annotation.JsonView;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;

import java.util.List;
import java.util.Set;

@Data
public class TeacherResponse {
  private Long id;
  private String email;
  private String photoUrl;
  private String phone;
  private String firstName;
  private String lastName;
  private Integer age;
//  private UserResponse user;
//  @ToString.Exclude
//  @EqualsAndHashCode.Exclude
//  @JsonView(View.Teacher.class)
  private Set<StudentResponse> students;
  @ToString.Exclude
  @EqualsAndHashCode.Exclude
  @JsonView(View.Teacher.class)
  private Set<LessonResponse> lessons;
  private Set<Discipline> disciplines;
  @ToString.Exclude
  @EqualsAndHashCode.Exclude
  @JsonView(View.Teacher.class)
  private Set<PriceResponse> prices;
  private Set<TeacherWorkTimeResponse> workTimes;
}
