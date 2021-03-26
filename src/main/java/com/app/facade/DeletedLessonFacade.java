package com.app.facade;

import com.app.dto.request.DeletedLessonRequest;
import com.app.dto.response.ApiResponse;
import com.app.dto.response.DeletedLessonResponse;
import com.app.model.DeletedLesson;
import com.app.service.DeletedLessonService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class DeletedLessonFacade {
  private final DeletedLessonService deletedLessonService;
  private final ModelMapper modelMapper;

  public DeletedLessonResponse getLessonById(Long id) {
    DeletedLesson deletedLesson = deletedLessonService.getLessonById(id);
    return modelMapper.map(deletedLesson, DeletedLessonResponse.class);
  }

  public ApiResponse createLesson(DeletedLessonRequest request) {
    DeletedLesson lesson = modelMapper.map(request, DeletedLesson.class);
    ApiResponse response = deletedLessonService.createLesson(lesson);
    return response;
  }

  public Page<DeletedLessonResponse> findAll(Pageable pageable) {
    Page<DeletedLesson> lessons = deletedLessonService.findAllOrderByDate(pageable);
    return lessons.map(deletedLesson -> modelMapper.map(deletedLesson, DeletedLessonResponse.class));
  }

  public ApiResponse deleteLesson(Long id) {
   return deletedLessonService.deleteLesson(id);
  }

  public ApiResponse updateDeletedLesson(DeletedLessonRequest request, Long id) {
    DeletedLesson deletedLesson = modelMapper.map(request, DeletedLesson.class);
    return deletedLessonService.updateLesson(deletedLesson, id);
  }
}
