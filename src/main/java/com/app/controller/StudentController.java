package com.app.controller;

import com.app.dto.request.StudentRequest;
import com.app.dto.response.StudentResponse;
import com.app.dto.view.View;
import com.app.facade.StudentFacade;
import com.fasterxml.jackson.annotation.JsonView;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/api/v1/students")
@PreAuthorize("hasAnyAuthority('SUPER_ADMIN, ADMIN')")
@RequiredArgsConstructor
public class StudentController {
  private final StudentFacade studentFacade;

  @GetMapping("{id}")
  @JsonView(View.Student.class)
  public ResponseEntity<StudentResponse> getById(@PathVariable Long id) {
    StudentResponse response = studentFacade.getById(id);
    return ResponseEntity.ok(response);
  }

  @GetMapping
  @JsonView(View.Student.class)
  public ResponseEntity<Page<StudentResponse>> getAll(Pageable pageable) {
    Page<StudentResponse> response = studentFacade.getAllStudents(pageable);
    return ResponseEntity.ok(response);
  }

  @PostMapping
  @JsonView(View.Student.class)
  public ResponseEntity<StudentResponse> createStudent(@RequestBody StudentRequest request) {
    StudentResponse response = studentFacade.cretaeStudent(request);
    return new ResponseEntity<>(response, HttpStatus.CREATED);
  }

  @PutMapping("{id}")
  @JsonView(View.Student.class)
  public ResponseEntity<StudentResponse> updateStudent(@PathVariable Long id, @RequestBody StudentRequest request) {
    StudentResponse response = studentFacade.updateStudent(id, request);
    return ResponseEntity.ok(response);
  }

  @DeleteMapping("{id}")
  @JsonView(View.Student.class)
  public ResponseEntity<Void> deleteStudent(@PathVariable Long id) {
    studentFacade.deleteStudent(id);
    return ResponseEntity.noContent().build();
  }
}
