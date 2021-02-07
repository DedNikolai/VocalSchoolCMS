package com.app.dto.request;

import com.app.model.Discipline;
import lombok.Data;

import java.util.Date;

@Data
public class AbonementRequest {
  private Long id;
  private Date createdDate;
  private StudentRequest student;
  private TeacherRequest teacher;
  private Integer quantity;
  private Integer price;
  private Discipline discipline;
//  private Date startedDate;
//  private Date endDate;
  private Integer transferedQuantity;
}
