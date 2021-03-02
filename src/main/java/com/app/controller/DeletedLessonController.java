package com.app.controller;

import com.app.dto.request.DeletedLessonRequest;
import com.app.dto.response.ApiResponse;
import com.app.dto.response.DeletedLessonResponse;
import com.app.dto.view.View;
import com.app.facade.DeletedLessonFacade;
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
@RequestMapping("/api/v1/deleted-lessons")
@PreAuthorize("hasAnyAuthority('SUPER_ADMIN, ADMIN')")
@RequiredArgsConstructor
public class DeletedLessonController {
  private final DeletedLessonFacade deletedLessonFacade;

  @GetMapping("{id}")
  @JsonView(View.DeletedLesson.class)
  public ResponseEntity<DeletedLessonResponse> getLessonById(@PathVariable Long id) {
    DeletedLessonResponse response = deletedLessonFacade.getLessonById(id);
    return ResponseEntity.ok(response);
  }

  @PutMapping("id")
  @JsonView(View.DeletedLesson.class)
  public ResponseEntity<DeletedLessonResponse> updateDeletedLesson(@RequestBody DeletedLessonRequest request, @PathVariable Long id) {
    DeletedLessonResponse response = deletedLessonFacade.updateDeletedLesson(request, id);
    return ResponseEntity.ok(response);
  }

  @PostMapping
  @JsonView(View.DeletedLesson.class)
  public ResponseEntity<ApiResponse> createLesson(@RequestBody DeletedLessonRequest request) {
    ApiResponse response = deletedLessonFacade.createLesson(request);
    return new ResponseEntity<>(response, HttpStatus.CREATED);
  }

  @DeleteMapping("{id}")
  @JsonView(View.DeletedLesson.class)
  public ResponseEntity<ApiResponse> deletLesson(@PathVariable Long id) {
    ApiResponse response = deletedLessonFacade.deleteLesson(id);
    return ResponseEntity.ok(response);
  }

  @GetMapping
  @JsonView(View.DeletedLesson.class)
  public ResponseEntity<Page<DeletedLessonResponse>> getAllSortedByDate(Pageable pageable) {
    Page<DeletedLessonResponse> response = deletedLessonFacade.findAll(pageable);
    return ResponseEntity.ok(response);
  }
}
