package com.app.controller;

import com.app.dto.request.TeacherRequest;
import com.app.dto.response.TeacherResponse;
import com.app.dto.view.View;
import com.app.facade.TeacherFacade;
import com.fasterxml.jackson.annotation.JsonView;
import lombok.RequiredArgsConstructor;
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

import java.util.List;

@Controller
@RequestMapping("/api/v1/teachers")
@RequiredArgsConstructor
public class TeacherController {
  private final TeacherFacade teacherFacade;

  @GetMapping("{id}")
  @JsonView(View.Teacher.class)
  public ResponseEntity<TeacherResponse> getById(@PathVariable Long id) {
    TeacherResponse response = teacherFacade.getTeacherById(id);
    return ResponseEntity.ok(response);
  }

  @GetMapping
  @JsonView(View.Teacher.class)
  @PreAuthorize("hasAnyAuthority('SUPER_ADMIN, ADMIN')")
  public ResponseEntity<List<TeacherResponse>> getAll() {
    List<TeacherResponse> response = teacherFacade.getAllTeachers();
    return ResponseEntity.ok(response);
  }

  @PostMapping
  @JsonView(View.Teacher.class)
  @PreAuthorize("hasAnyAuthority('SUPER_ADMIN, ADMIN')")
  public ResponseEntity<TeacherResponse> createStudent(@RequestBody TeacherRequest request) {
    TeacherResponse response = teacherFacade.createTeacher(request);
    return new ResponseEntity<>(response, HttpStatus.CREATED);
  }

  @PutMapping("{id}")
  @JsonView(View.Teacher.class)
  @PreAuthorize("hasAnyAuthority('SUPER_ADMIN, ADMIN')")
  public ResponseEntity<TeacherResponse> updateStudent(@PathVariable Long id, @RequestBody TeacherRequest request) {
    TeacherResponse response = teacherFacade.updateTeacher(id, request);
    return ResponseEntity.ok(response);
  }

  @DeleteMapping("{id}")
  @JsonView(View.Teacher.class)
  @PreAuthorize("hasAnyAuthority('SUPER_ADMIN, ADMIN')")
  public ResponseEntity<Void> deleteStudent(@PathVariable Long id) {
    teacherFacade.deleteTeacher(id);
    return ResponseEntity.noContent().build();
  }
}
