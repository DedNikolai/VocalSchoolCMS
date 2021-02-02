package com.app.dto.response;

import com.app.dto.view.View;
import com.app.model.Discipline;
import com.fasterxml.jackson.annotation.JsonView;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;

import java.util.Date;

@Data
public class AbonementResponse {
  private Long id;
  private Date createdDate;
  @ToString.Exclude
  @EqualsAndHashCode.Exclude
  @JsonView(View.Abonement.class)
  private StudentResponse student;
  @ToString.Exclude
  @EqualsAndHashCode.Exclude
  @JsonView(View.Abonement.class)
  private TeacherResponse teacher;
  private Integer quantity;
  private Integer price;
  private Discipline discipline;
}
