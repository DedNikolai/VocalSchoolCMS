package com.app.dto.request;

import lombok.Data;

import java.util.Set;

@Data
public class StudentRequest {
  private Long id;
  private String email;
  private String photoUrl;
  private String phone;
  private String firstName;
  private String lastName;
  private Integer age;
  private Integer payBalance;
  private Set<TeacherRequest> teachers;
  private Set<LessonRequest> lessons;
  private Set<ConfirmedLessonRequest> confirmedLessons;
  private String parent;
}
