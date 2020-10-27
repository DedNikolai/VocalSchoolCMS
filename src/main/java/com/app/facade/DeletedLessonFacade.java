package com.app.facade;

import com.app.dto.request.DeletedLessonRequest;
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

  public DeletedLessonResponse createLesson(DeletedLessonRequest request) {
    DeletedLesson lesson = modelMapper.map(request, DeletedLesson.class);
    DeletedLesson deletedLesson = deletedLessonService.createLesson(lesson);
    return modelMapper.map(deletedLesson, DeletedLessonResponse.class);
  }

  public Page<DeletedLessonResponse> findAll(Pageable pageable) {
    Page<DeletedLesson> lessons = deletedLessonService.findAllOrderByDate(pageable);
    return lessons.map(deletedLesson -> modelMapper.map(deletedLesson, DeletedLessonResponse.class));
  }

  public void deleteLesson(Long id) {
    deletedLessonService.deleteLesson(id);
  }

  public DeletedLessonResponse updateDeletedLesson(DeletedLessonRequest request, Long id) {
    DeletedLesson deletedLesson = modelMapper.map(request, DeletedLesson.class);
    DeletedLesson updatedLesson = deletedLessonService.updateLesson(deletedLesson, id);
    return modelMapper.map(updatedLesson, DeletedLessonResponse.class);
  }
}
