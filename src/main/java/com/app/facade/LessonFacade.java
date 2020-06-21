package com.app.facade;

import com.app.dto.request.LessonRequest;
import com.app.dto.response.LessonResponse;
import com.app.dto.response.StudentResponse;
import com.app.model.Lesson;
import com.app.model.LessonDay;
import com.app.service.LessonService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

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

  public LessonResponse createLesson(LessonRequest lessonRequest) {
    Lesson lesson = modelMapper.map(lessonRequest, Lesson.class);
    Lesson createdLesson = lessonService.createLesson(lesson);
    return modelMapper.map(createdLesson, LessonResponse.class);
  }

  public LessonResponse deleteLesson(Long id) {
    Lesson lesson = lessonService.deleteLesson(id);
    return modelMapper.map(lesson, LessonResponse.class);
  }

  public LessonResponse getLessonById(Long id) {
    Lesson lesson = lessonService.getLessonById(id);
    return modelMapper.map(lesson, LessonResponse.class);
  }

  public LessonResponse updateLesson(LessonRequest request, Long id) {
    Lesson lesson = modelMapper.map(request, Lesson.class);
    Lesson updatedLesson = lessonService.updateLesson(lesson, id);
    return modelMapper.map(updatedLesson, LessonResponse.class);
  }

  public List<LessonResponse> getAllLessons() {
    List<Lesson> lessons = lessonService.getAllLessons();
    List<LessonResponse> response = lessons.stream().map(lesson -> modelMapper.map(lesson, LessonResponse.class)).collect(Collectors.toList());
    return response;
  }

  public List<LessonResponse> getAllLessonsByDay(LessonDay lessonDay) {
    List<Lesson> lessons = lessonService.getAllbyDay(lessonDay);
    List<LessonResponse> response = lessons.stream().map(lesson -> modelMapper.map(lesson, LessonResponse.class)).collect(Collectors.toList());
    return response;
  }
}
