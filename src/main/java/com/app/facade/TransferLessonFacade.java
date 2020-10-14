package com.app.facade;

import com.app.dto.request.TransferLessonRequest;
import com.app.dto.response.TransferLessonResponse;
import com.app.model.TransferLesson;
import com.app.service.TransferLessonService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Component;

import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Component
@RequiredArgsConstructor
public class TransferLessonFacade {
  private final ModelMapper modelMapper;
  private final TransferLessonService transferLessonService;

  public Page<TransferLessonResponse> getAllLessons(Pageable pageable) {
    Page<TransferLesson> lessons = transferLessonService.getAllOrderByDate(pageable);
    return lessons.map(transferLesson -> modelMapper.map(transferLesson, TransferLessonResponse.class));
  }

  public TransferLessonResponse getById(Long id) {
    TransferLesson lesson = transferLessonService.getById(id);
    return modelMapper.map(lesson, TransferLessonResponse.class);
  }

  public TransferLessonResponse createLesson(TransferLessonRequest request) {
    TransferLesson transferLesson = modelMapper.map(request, TransferLesson.class);
    TransferLesson lesson = transferLessonService.createTransferLesson(transferLesson);
    return modelMapper.map(lesson, TransferLessonResponse.class);
  }

  public TransferLessonResponse updateLesson(TransferLessonRequest request, Long id) {
    TransferLesson transferLesson = modelMapper.map(request, TransferLesson.class);
    TransferLesson lesson = transferLessonService.updateLesson(transferLesson, id);
    return modelMapper.map(lesson, TransferLessonResponse.class);
  }

  public void deleteLesson(Long id) {
    transferLessonService.deleteLesson(id);
  }

  public List<TransferLessonResponse> findAllByTransferDate(Date date) {
    List<TransferLesson> transferLessons = transferLessonService.findAllbyTransferDate(date);
    List<TransferLessonResponse> lessons = transferLessons.stream().map(transferLesson -> modelMapper.map(transferLesson, TransferLessonResponse.class)).collect(Collectors.toList());
    return lessons;
  }
}
