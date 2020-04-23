package com.app.controller;

import com.app.dto.request.TeacherWorkTimeRequest;
import com.app.dto.response.TeacherWorkTimeResponse;
import com.app.facade.TeacherWorkTimeFacade;
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
@RequestMapping("/api/v1/worktimes")
@PreAuthorize("hasAnyAuthority('SUPER_ADMIN, ADMIN')")
@RequiredArgsConstructor
public class TeacherWorkTime {
  public final TeacherWorkTimeFacade teacherWorkTimeFacade;

  @GetMapping("teacher/{id}")
  public ResponseEntity<List<TeacherWorkTimeResponse>> getAllByTeacher(@PathVariable Long id) {
    List<TeacherWorkTimeResponse> response = teacherWorkTimeFacade.getAllByTeacher(id);
    return ResponseEntity.ok(response);
  }

  @PostMapping("teacher/{id}")
  public ResponseEntity<TeacherWorkTimeResponse> creteTime(@PathVariable Long id, @RequestBody TeacherWorkTimeRequest request) {
    TeacherWorkTimeResponse response = teacherWorkTimeFacade.createTime(id, request);
    return new ResponseEntity<>(response, HttpStatus.CREATED);
  }

  @PutMapping("{id}")
  public ResponseEntity<TeacherWorkTimeResponse> updateTime(@PathVariable Long id, @RequestBody TeacherWorkTimeRequest request) {
    TeacherWorkTimeResponse response = teacherWorkTimeFacade.updateTime(id, request);
    return ResponseEntity.ok(response);
  }

  @DeleteMapping("{id}")
  public ResponseEntity<Void> deleteTime(@PathVariable Long id) {
    teacherWorkTimeFacade.deleteTime(id);
    return ResponseEntity.noContent().build();
  }
}
