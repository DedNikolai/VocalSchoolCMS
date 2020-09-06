package com.app.service;

import com.app.exeption.ResourceNotFoundException;
import com.app.model.ConfirmedLesson;
import com.app.repository.ConfirmedLessonRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ConfirmedLessonServiceImp implements ConfirmedLessonService {
  private final ConfirmedLessonRepository confirmedLessonRepository;

  @Override
  public ConfirmedLesson getLessonById(Long id) {
    return confirmedLessonRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Lesson", "id", id));
  }

  @Override
  public ConfirmedLesson createLesson(ConfirmedLesson confirmedLesson) {
    return confirmedLessonRepository.save(confirmedLesson);
  }

  @Override
  public ConfirmedLesson updateLesson(ConfirmedLesson confirmedLesson, Long id) {
    ConfirmedLesson lessonFromDb = confirmedLessonRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Lesson", "id", id));
    confirmedLesson.setId(lessonFromDb.getId());
    return confirmedLessonRepository.save(confirmedLesson);
  }

  @Override
  public void deleteLesson(Long id) {
    ConfirmedLesson lessonFromDb = confirmedLessonRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Lesson", "id", id));
    confirmedLessonRepository.delete(lessonFromDb);
  }

  @Override
  public Page<ConfirmedLesson> findAllOrderByDate(Pageable pageable) {
    return confirmedLessonRepository.findAllByOrderByCreatedDateAsc(pageable);
  }
}
