package com.app.facade;

import com.app.dto.request.LessonRequest;
import com.app.dto.response.ApiResponse;
import com.app.dto.response.LessonResponse;
import com.app.dto.response.StudentResponse;
import com.app.model.Lesson;
import com.app.model.LessonDay;
import com.app.service.LessonService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Component
@RequiredArgsConstructor
public class LessonFacade {
  private final ModelMapper modelMapper;
  private final LessonService lessonService;

  public List<LessonResponse> findLessonsByStudent(Long id) {
    List<Lesson> lessons = lessonService.getLessonsByStudent(id);
    List<LessonResponse> response = lessons.stream().map(lesson -> modelMapper.map(lesson, LessonResponse.class)).collect(Collectors.toList());
    return response;
  }

  public ApiResponse createLesson(LessonRequest lessonRequest) {
    Lesson lesson = modelMapper.map(lessonRequest, Lesson.class);
    return lessonService.createLesson(lesson);
  }

  public LessonResponse deleteLesson(Long id) {
    Lesson lesson = lessonService.deleteLesson(id);
    return modelMapper.map(lesson, LessonResponse.class);
  }

  public LessonResponse getLessonById(Long id) {
    Lesson lesson = lessonService.getLessonById(id);
    return modelMapper.map(lesson, LessonResponse.class);
  }

  public ApiResponse updateLesson(LessonRequest request, Long id) {
    Lesson lesson = modelMapper.map(request, Lesson.class);
    return lessonService.updateLesson(lesson, id);
  }

  public List<LessonResponse> getAllLessons() {
    List<Lesson> lessons = lessonService.getAllLessons();
    List<LessonResponse> response = lessons.stream().map(lesson -> modelMapper.map(lesson, LessonResponse.class)).collect(Collectors.toList());
    return response;
  }

  public List<LessonResponse> getAllLessonsByDay(Date date) {
    List<Lesson> lessons = lessonService.getAllbyDay(date);
    List<LessonResponse> response = lessons.stream().map(lesson -> modelMapper.map(lesson, LessonResponse.class)).collect(Collectors.toList());
    return response;
  }

  public List<LessonResponse> findAllLessonsByLessonDay(String day) {
    List<Lesson> lessons = lessonService.findAllbyLessonDay(day);
    List<LessonResponse> response = lessons.stream().map(lesson -> modelMapper.map(lesson, LessonResponse.class)).collect(Collectors.toList());
    return response;
  }
}
