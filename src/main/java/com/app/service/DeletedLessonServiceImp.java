package com.app.service;

import com.app.exeption.ResourceNotFoundException;
import com.app.model.ConfirmedLesson;
import com.app.model.DeletedLesson;
import com.app.repository.ConfirmedLessonRepository;
import com.app.repository.DeletedLessonRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class DeletedLessonServiceImp implements DeletedLessonService {
  private final DeletedLessonRepository deletedLessonRepository;

  @Override
  public DeletedLesson getLessonById(Long id) {
    return deletedLessonRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Deleted Lesson", "id", id));
  }

  @Override
  public DeletedLesson createLesson(DeletedLesson deletedLesson) {
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
