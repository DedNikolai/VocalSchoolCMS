package com.app.service;

import com.app.exeption.AppException;
import com.app.exeption.ResourceNotFoundException;
import com.app.model.ConfirmedLesson;
import com.app.model.DeletedLesson;
import com.app.model.Lesson;
import com.app.model.Status;
import com.app.model.TransferLesson;
import com.app.repository.ConfirmedLessonRepository;
import com.app.repository.DeletedLessonRepository;
import com.app.repository.TransferLessonRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class TransferLessonServiceImpl implements TransferLessonService{
  private final TransferLessonRepository transferLessonRepository;
  private final ConfirmedLessonRepository confirmedLessonRepository;
  private final DeletedLessonRepository deletedLessonRepository;

  @Override
  public Page<TransferLesson> getAllOrderByDate(Pageable pageable) {
    return transferLessonRepository.findAllByOrderByCreatedDateAsc(pageable);
  }

  @Override
  public TransferLesson getById(Long id) {
    return transferLessonRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("TransferLesson", "id", id));
  }

  @Override
  public TransferLesson createTransferLesson(TransferLesson request) {
    List<ConfirmedLesson> confirmedLessons = confirmedLessonRepository.findAllByLessonDate(request.getLessonDate());
    List<TransferLesson> transferLessons = transferLessonRepository.findAllByLessonDate(request.getLessonDate());
    List<DeletedLesson> deletedLessons = deletedLessonRepository.findAllByLessonDate(request.getLessonDate());
    boolean confirmed = confirmedLessons.stream().anyMatch(lesson -> lesson.getLesson().getId() == request.getLesson().getId());
    boolean transfered = transferLessons.stream().anyMatch(lesson -> lesson.getLesson().getId() == request.getLesson().getId());
    boolean deleted = deletedLessons.stream().anyMatch(lesson -> lesson.getLesson().getId() == request.getLesson().getId());
    if (confirmed || transfered  || deleted) {
      throw new AppException("Lesson status is checked");
    }
    return transferLessonRepository.save(request);
  }

  @Override
  public TransferLesson updateLesson(TransferLesson request, Long id) {
    TransferLesson transferLesson = transferLessonRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("TransferLesson", "id", id));
    request.setId(transferLesson.getId());
    return transferLessonRepository.save(request);
  }

  @Override
  public List<TransferLesson> findAllbyTransferDate(Date date) {
    Calendar cal = Calendar.getInstance();
    cal.setTime(date);
    SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");
    String dateString = format.format(date);
    Date parseDate = null;
    try {
      parseDate = format.parse(dateString);
    } catch (ParseException e) {
      e.printStackTrace();
    }
    List<ConfirmedLesson> confirmedLessons = confirmedLessonRepository.findAllByLessonDate(parseDate);
    List<TransferLesson> transferLessons = transferLessonRepository.findAllByTransferDate(parseDate);

    List<TransferLesson> lessonList = transferLessons.stream().map(lesson -> {
      boolean confirmed = confirmedLessons.stream().anyMatch(confirmedLesson -> {
        return confirmedLesson.getLesson().getId() == lesson.getLesson().getId() && confirmedLesson.getLessonTime().equals(lesson.getTransferTime());
      });

      if (confirmed) {
        lesson.setStatus(Status.CONFIRMED);
      }

      return lesson;
    }).collect(Collectors.toList());

    return lessonList;
  }

  @Override
  public void deleteLesson(Long id) {
    TransferLesson transferLesson = transferLessonRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("TransferLesson", "id", id));
    transferLessonRepository.delete(transferLesson);
  }
}
