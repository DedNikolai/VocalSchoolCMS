package com.app.controller;

import com.app.dto.request.LessonRequest;
import com.app.dto.response.LessonResponse;
import com.app.facade.LessonFacade;
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
@RequestMapping("/api/v1/lessons")
@PreAuthorize("hasAnyAuthority('SUPER_ADMIN, ADMIN')")
@RequiredArgsConstructor
public class LessonController {
  private final LessonFacade lessonFacade;

  @GetMapping("student/{id}")
  public ResponseEntity<List<LessonResponse>> getLessonsByStudent(@PathVariable Long id) {
    List<LessonResponse> response = lessonFacade.findLessonsByStudent(id);
    return ResponseEntity.ok(response);
  }

  @PostMapping
  public ResponseEntity<LessonResponse> createNewLesson(@RequestBody LessonRequest request) {
    LessonResponse response = lessonFacade.createLesson(request);
    return new ResponseEntity<>(response, HttpStatus.CREATED);
  }

  @DeleteMapping("{id}")
  public ResponseEntity<LessonResponse> deleteLesson(@PathVariable Long id) {
    LessonResponse response = lessonFacade.deleteLesson(id);
    return ResponseEntity.ok(response);
  }

  @GetMapping("{id}")
  public ResponseEntity<LessonResponse> getLessonById(@PathVariable Long id) {
    LessonResponse response = lessonFacade.getLessonById(id);
    return ResponseEntity.ok(response);
  }

  @PutMapping("{id}")
  public ResponseEntity<LessonResponse> updateLesson(@RequestBody LessonRequest request, @PathVariable Long id) {
    LessonResponse response = lessonFacade.updateLesson(request, id);
    return ResponseEntity.ok(response);
  }
}
