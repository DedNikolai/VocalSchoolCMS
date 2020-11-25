package com.app.service;

import com.app.exeption.AppException;
import com.app.exeption.ResourceNotFoundException;
import com.app.model.ConfirmedLesson;
import com.app.model.DeletedLesson;
import com.app.model.TransferLesson;
import com.app.repository.ConfirmedLessonRepository;
import com.app.repository.DeletedLessonRepository;
import com.app.repository.TransferLessonRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class DeletedLessonServiceImp implements DeletedLessonService {
  private final ConfirmedLessonRepository confirmedLessonRepository;
  private final TransferLessonRepository transferLessonRepository;
  private final DeletedLessonRepository deletedLessonRepository;

  @Override
  public DeletedLesson getLessonById(Long id) {
    return deletedLessonRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Deleted Lesson", "id", id));
  }

  @Override
  public DeletedLesson createLesson(DeletedLesson deletedLesson) {
    List<ConfirmedLesson> confirmedLessons = confirmedLessonRepository.findAllByLessonDate(deletedLesson.getLessonDate());
    List<TransferLesson> transferLessons = transferLessonRepository.findAllByLessonDate(deletedLesson.getLessonDate());
    List<DeletedLesson> deletedLessons = deletedLessonRepository.findAllByLessonDate(deletedLesson.getLessonDate());
    boolean confirmed = confirmedLessons.stream().anyMatch(lesson -> lesson.getLesson().getId() == deletedLesson.getLesson().getId());
    boolean transfered = transferLessons.stream().anyMatch(lesson -> lesson.getLesson().getId() == deletedLesson.getLesson().getId());
    boolean deleted = deletedLessons.stream().anyMatch(lesson -> lesson.getLesson().getId() == deletedLesson.getLesson().getId());
    if (confirmed || transfered  || deleted) {
      throw new AppException("Lesson status is checked");
    }
    return deletedLessonRepository.save(deletedLesson);
  }

  @Override
  public DeletedLesson updateLesson(DeletedLesson deletedLesson, Long id) {
    DeletedLesson lessonFromDb = deletedLessonRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Lesson", "id", id));
    deletedLesson.setId(lessonFromDb.getId());
    return deletedLessonRepository.save(deletedLesson);
  }

  @Override
  public void deleteLesson(Long id) {
    DeletedLesson lessonFromDb = deletedLessonRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Lesson", "id", id));
    deletedLessonRepository.delete(lessonFromDb);
  }

  @Override
  public Page<DeletedLesson> findAllOrderByDate(Pageable pageable) {
    return deletedLessonRepository.findAllByOrderByCreatedDateAsc(pageable);
  }
}
