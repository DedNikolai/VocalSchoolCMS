package com.app.facade;

import com.app.dto.request.ConfirmedLessonRequest;
import com.app.dto.request.StudentRequest;
import com.app.dto.request.TransferLessonRequest;
import com.app.dto.response.ApiResponse;
import com.app.dto.response.TransferLessonResponse;
import com.app.model.ConfirmedLesson;
import com.app.model.Student;
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

  public ApiResponse createLesson(TransferLessonRequest request) {
    TransferLesson transferLesson = modelMapper.map(request, TransferLesson.class);
    return transferLessonService.createTransferLesson(transferLesson);
  }

  public ApiResponse updateLesson(TransferLessonRequest request, Long id) {
    TransferLesson transferLesson = modelMapper.map(request, TransferLesson.class);
    return transferLessonService.updateLesson(transferLesson, id);
  }

  public ApiResponse deleteLesson(Long id) {
    return transferLessonService.deleteLesson(id);
  }

  public List<TransferLessonResponse> findAllByTransferDate(Date date) {
    List<TransferLesson> transferLessons = transferLessonService.findAllbyTransferDate(date);
    List<TransferLessonResponse> lessons = transferLessons.stream().map(transferLesson -> modelMapper.map(transferLesson, TransferLessonResponse.class)).collect(Collectors.toList());
    return lessons;
  }

  public ApiResponse confirmTransferLesson(ConfirmedLessonRequest request, Long transferId) {
    ConfirmedLesson confirmedLesson = modelMapper.map(request, ConfirmedLesson.class);
    return transferLessonService.confirmTransferLesson(confirmedLesson, transferId);
  }

  public List<TransferLessonResponse> findAllActiveByStudent(Long studentId) {
    List<TransferLesson> transferLesson = transferLessonService.findAllStudentActiveLessons(studentId);
    return transferLesson.stream().map(lesson -> modelMapper.map(lesson, TransferLessonResponse.class)).collect(Collectors.toList());
  }

  public ApiResponse rejectTransferLesson(Long id) {
    return transferLessonService.rejectTransferLesson(id);
  }
}
