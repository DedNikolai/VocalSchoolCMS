package com.app.facade;

import com.app.dto.request.ConfirmedLessonRequest;
import com.app.dto.response.ApiResponse;
import com.app.dto.response.ConfirmedLessonResponse;
import com.app.model.ConfirmedLesson;
import com.app.service.ConfirmedLessonService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class ConfirmedLessonFacade {
  private final ConfirmedLessonService confirmedLessonService;
  private final ModelMapper modelMapper;

  public ConfirmedLessonResponse getLessonById(Long id) {
    ConfirmedLesson confirmedLesson = confirmedLessonService.getLessonById(id);
    return modelMapper.map(confirmedLesson, ConfirmedLessonResponse.class);
  }

  public ApiResponse createLesson(ConfirmedLessonRequest request) {
    ConfirmedLesson lesson = modelMapper.map(request, ConfirmedLesson.class);
    return confirmedLessonService.createLesson(lesson);
  }

  public Page<ConfirmedLessonResponse> findAll(Pageable pageable) {
    Page<ConfirmedLesson> lessons = confirmedLessonService.findAllOrderByDate(pageable);
    return lessons.map(confirmedLesson -> modelMapper.map(confirmedLesson, ConfirmedLessonResponse.class));
  }

  public void deleteLesson(Long id) {
    confirmedLessonService.deleteLesson(id);
  }
}
