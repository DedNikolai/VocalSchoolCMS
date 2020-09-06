package com.app.controller;

import com.app.dto.request.ConfirmedLessonRequest;
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
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

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
  public ResponseEntity<ConfirmedLessonResponse> createLesson(@RequestBody ConfirmedLessonRequest request) {
    ConfirmedLessonResponse response = confirmedLessonFacade.createLesson(request);
    return new ResponseEntity<>(response, HttpStatus.CREATED);
  }

  @DeleteMapping("{id}")
  @JsonView(View.ConfirmedLesson.class)
  public ResponseEntity<Void> deletLesson(@PathVariable Long id) {
    confirmedLessonFacade.deleteLesson(id);
    return ResponseEntity.noContent().build();
  }

  @GetMapping
  @JsonView(View.ConfirmedLesson.class)
  public ResponseEntity<Page<ConfirmedLessonResponse>> getAllSortedByDate(Pageable pageable) {
    Page<ConfirmedLessonResponse> response = confirmedLessonFacade.findAll(pageable);
    return ResponseEntity.ok(response);
  }
}
