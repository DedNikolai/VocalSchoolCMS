package com.app.controller;

import com.app.dto.request.LessonRequest;
import com.app.dto.response.ApiResponse;
import com.app.dto.response.LessonResponse;
import com.app.dto.view.View;
import com.app.facade.LessonFacade;
import com.app.model.LessonDay;
import com.fasterxml.jackson.annotation.JsonView;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
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
import org.springframework.web.bind.annotation.RequestParam;

import java.util.Date;
import java.util.List;

@Controller
@RequestMapping("/api/v1/lessons")
@PreAuthorize("hasAnyAuthority('SUPER_ADMIN, ADMIN')")
@RequiredArgsConstructor
public class LessonController {
  private final LessonFacade lessonFacade;

  @GetMapping("student/{id}")
  @JsonView(View.Lesson.class)
  public ResponseEntity<List<LessonResponse>> getLessonsByStudent(@PathVariable Long id) {
    List<LessonResponse> response = lessonFacade.findLessonsByStudent(id);
    return ResponseEntity.ok(response);
  }

  @PostMapping
  @JsonView(View.Lesson.class)
  public ResponseEntity<ApiResponse> createNewLesson(@RequestBody LessonRequest request) {
    ApiResponse response = lessonFacade.createLesson(request);
    return ResponseEntity.ok(response);
  }

  @DeleteMapping("{id}")
  @JsonView(View.Lesson.class)
  public ResponseEntity<LessonResponse> deleteLesson(@PathVariable Long id) {
    LessonResponse response = lessonFacade.deleteLesson(id);
    return ResponseEntity.ok(response);
  }

  @GetMapping("{id}")
  @JsonView(View.Lesson.class)
  public ResponseEntity<LessonResponse> getLessonById(@PathVariable Long id) {
    LessonResponse response = lessonFacade.getLessonById(id);
    return ResponseEntity.ok(response);
  }

  @PutMapping("{id}")
  @JsonView(View.Lesson.class)
  public ResponseEntity<ApiResponse> updateLesson(@RequestBody LessonRequest request, @PathVariable Long id) {
    ApiResponse response = lessonFacade.updateLesson(request, id);
    return ResponseEntity.ok(response);
  }

  @GetMapping
  @JsonView(View.Lesson.class)
  public ResponseEntity<List<LessonResponse>> getLessons() {
    List<LessonResponse> response = lessonFacade.getAllLessons();
    return ResponseEntity.ok(response);
  }

  @GetMapping("day/{date}")
  @JsonView(View.Lesson.class)
  public ResponseEntity<List<LessonResponse>> getLessonsByDay(@PathVariable Date date) {
    List<LessonResponse> response = lessonFacade.getAllLessonsByDay(date);
    return ResponseEntity.ok(response);
  }

  @GetMapping("lessonDay/{day}")
  @JsonView(View.Lesson.class)
  public ResponseEntity<List<LessonResponse>> getLessonsByLessonsDay(@PathVariable String day) {
    List<LessonResponse> response = lessonFacade.findAllLessonsByLessonDay(day);
    return ResponseEntity.ok(response);
  }

  @GetMapping("dates")
  @JsonView(View.Lesson.class)
  public ResponseEntity<List<LessonResponse>> getLessonsByStudent(
      @RequestParam @DateTimeFormat(pattern = "yyyy-MM-dd") Date startDate,
      @RequestParam @DateTimeFormat(pattern = "yyyy-MM-dd") Date finishDate) {
    List<LessonResponse> response = lessonFacade.findAllByDates(startDate, finishDate);
    return ResponseEntity.ok(response);
  }
}
