package com.app.controller;

import com.app.dto.request.ConfirmedLessonRequest;
import com.app.dto.response.ApiResponse;
import com.app.dto.response.ConfirmedLessonResponse;
import com.app.dto.view.View;
import com.app.facade.ConfirmedLessonFacade;
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

import java.util.List;

@Controller
@RequestMapping("/api/v1/confirmed-lessons")
@PreAuthorize("hasAnyAuthority('SUPER_ADMIN, ADMIN')")
@RequiredArgsConstructor
public class ConfirmedLessonController {
  private final ConfirmedLessonFacade confirmedLessonFacade;

  @GetMapping("{id}")
  @JsonView(View.ConfirmedLesson.class)
  public ResponseEntity<ConfirmedLessonResponse> getLessonById(@PathVariable Long id) {
    ConfirmedLessonResponse response = confirmedLessonFacade.getLessonById(id);
    return ResponseEntity.ok(response);
  }

  @PostMapping
  @JsonView(View.ConfirmedLesson.class)
  public ResponseEntity<ApiResponse> createLesson(@RequestBody ConfirmedLessonRequest request) {
    ApiResponse response = confirmedLessonFacade.createLesson(request);
    return new ResponseEntity<>(response, HttpStatus.CREATED);
  }

  @DeleteMapping("{id}")
  @JsonView(View.ConfirmedLesson.class)
  public ResponseEntity<ApiResponse> deletLesson(@PathVariable Long id) {
    ApiResponse response = confirmedLessonFacade.deleteLesson(id);
    return ResponseEntity.ok(response);
  }

  @GetMapping
  @JsonView(View.ConfirmedLesson.class)
  public ResponseEntity<Page<ConfirmedLessonResponse>> getAllSortedByDate(Pageable pageable) {
    Page<ConfirmedLessonResponse> response = confirmedLessonFacade.findAll(pageable);
    return ResponseEntity.ok(response);
  }

  @GetMapping("not-paid/teacher/{id}")
  @JsonView(View.ConfirmedLesson.class)
  public ResponseEntity<List<ConfirmedLessonResponse>> getAllTeacherNoPaid(@PathVariable Long id) {
    List<ConfirmedLessonResponse> response = confirmedLessonFacade.findAllByTeacherNoPaid(id);
    return ResponseEntity.ok(response);
  }

  @PutMapping("pay/{id}")
  @JsonView(View.ConfirmedLesson.class)
  public ResponseEntity<ApiResponse> payConfirmedLesson(@PathVariable Long id) {
    ApiResponse response = confirmedLessonFacade.payConfirmedLesson(id);
    return ResponseEntity.ok(response);
  }

  @PutMapping("pay-all/teacher/{id}")
  @JsonView(View.ConfirmedLesson.class)
  public ResponseEntity<ApiResponse> payAllConfirmedLesson(@PathVariable Long id) {
    ApiResponse response = confirmedLessonFacade.payAllConfirmedLessons(id);
    return ResponseEntity.ok(response);
  }

  @PutMapping("{id}")
  public ResponseEntity<ApiResponse> updateLesson(@RequestBody ConfirmedLessonRequest request, @PathVariable Long id) {
    ApiResponse response = confirmedLessonFacade.updateLesson(request, id);
    return ResponseEntity.ok(response);
  }
}
