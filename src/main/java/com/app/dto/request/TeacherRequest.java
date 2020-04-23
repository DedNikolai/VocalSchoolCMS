package com.app.dto.request;

import com.app.dto.response.UserResponse;
import com.app.model.Discipline;
import lombok.Data;

import java.util.List;
import java.util.Set;

@Data
public class TeacherRequest {
  private Long id;
  private String email;
  private String photoUrl;
  private String phone;
  private String firstName;
  private String lastName;
  private Integer age;
  private UserResponse user;
  private Set<StudentRequest> students;
  private Set<LessonRequest> lessons;
  private Set<Discipline> disciplines;
  private Set<PriceRequest> prices;
  private Set<ConfirmedLessonRequest> confirmedLessons;
  private Set<TeacherWorkTimeRequest> workTimes;
}
