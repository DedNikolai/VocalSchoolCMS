package com.app.controller;

import com.app.dto.request.ConfirmedLessonRequest;
import com.app.dto.request.TransferLessonRequest;
import com.app.dto.response.ApiResponse;
import com.app.dto.response.TransferLessonResponse;
import com.app.dto.view.View;
import com.app.facade.TransferLessonFacade;
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

import java.util.Date;
import java.util.List;

@Controller
@RequestMapping("/api/v1/transfered-lessons")
@PreAuthorize("hasAnyAuthority('SUPER_ADMIN, ADMIN')")
@RequiredArgsConstructor
public class TransferLessonController {
  private final TransferLessonFacade transferLessonFacade;

  @GetMapping("{id}")
  @JsonView(View.TransferLesson.class)
  public ResponseEntity<TransferLessonResponse> getById(@PathVariable Long id) {
    TransferLessonResponse response = transferLessonFacade.getById(id);
    return ResponseEntity.ok(response);
  }

  @PostMapping
  @JsonView(View.TransferLesson.class)
  public ResponseEntity<ApiResponse> createLesson(@RequestBody TransferLessonRequest request) {
    ApiResponse response = transferLessonFacade.createLesson(request);
    return new ResponseEntity<>(response, HttpStatus.CREATED);
  }

  @PostMapping("{id}/confirm")
  @JsonView(View.TransferLesson.class)
  public ResponseEntity<ApiResponse> createLesson(@RequestBody ConfirmedLessonRequest request, @PathVariable Long id) {
    ApiResponse response = transferLessonFacade.confirmTransferLesson(request, id);
    return new ResponseEntity<>(response, HttpStatus.CREATED);
  }

  @PutMapping("{id}")
  @JsonView(View.TransferLesson.class)
  public ResponseEntity<TransferLessonResponse> updateLesson(@RequestBody TransferLessonRequest request, @PathVariable Long id) {
    TransferLessonResponse response = transferLessonFacade.updateLesson(request, id);
    return ResponseEntity.ok(response);
  }

  @GetMapping
  @JsonView(View.TransferLesson.class)
  public ResponseEntity<Page<TransferLessonResponse>> getAll(Pageable pageable) {
    Page<TransferLessonResponse> response = transferLessonFacade.getAllLessons(pageable);
    return ResponseEntity.ok(response);
  }

  @DeleteMapping("{id}")
  @JsonView(View.TransferLesson.class)
  public ResponseEntity<Void> deleteLesson(@PathVariable Long id) {
    transferLessonFacade.deleteLesson(id);
    return ResponseEntity.noContent().build();
  }

  @GetMapping("day/{date}")
  @JsonView(View.TransferLesson.class)
  public ResponseEntity<List<TransferLessonResponse>> getAllByDate(@PathVariable Date date) {
    List<TransferLessonResponse> response = transferLessonFacade.findAllByTransferDate(date);
    return ResponseEntity.ok(response);
  }

  @GetMapping("student/{id}")
  @JsonView(View.TransferLesson.class)
  public ResponseEntity<List<TransferLessonResponse>> getAllActiveStudentTransferLessons(@PathVariable Long id) {
    List<TransferLessonResponse> response = transferLessonFacade.findAllActiveByStudent(id);
    return ResponseEntity.ok(response);
  }
}
