package com.app.service;

import com.app.dto.response.ApiResponse;
import com.app.exeption.AppException;
import com.app.exeption.ResourceNotFoundException;
import com.app.model.Abonement;
import com.app.model.ConfirmedLesson;
import com.app.model.DeletedLesson;
import com.app.model.TransferLesson;
import com.app.repository.AbonementRepository;
import com.app.repository.ConfirmedLessonRepository;
import com.app.repository.DeletedLessonRepository;
import com.app.repository.TransferLessonRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class DeletedLessonServiceImp implements DeletedLessonService {
  private final ConfirmedLessonRepository confirmedLessonRepository;
  private final AbonementRepository abonementRepository;
  private final DeletedLessonRepository deletedLessonRepository;

  @Override
  public DeletedLesson getLessonById(Long id) {
    return deletedLessonRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Deleted Lesson", "id", id));
  }

  @Override
  @Transactional
  public ApiResponse createLesson(DeletedLesson deletedLesson) {
    List<ConfirmedLesson> confirmedLessons = confirmedLessonRepository.findAllByLessonDateAndLesson(deletedLesson.getLessonDate(), deletedLesson.getLesson());
    List<DeletedLesson> deletedLessons = deletedLessonRepository.findAllByLessonDateAndLesson(deletedLesson.getLessonDate(), deletedLesson.getLesson());
    boolean confirmed = confirmedLessons.size() != 0;
    boolean deleted = deletedLessons.size() != 0;

    if (confirmed || deleted) {
      return new ApiResponse(false, "Lesson status is checked");
    }

    Abonement abonement = abonementRepository.
        findFirstByStudentAndDisciplineOrderByCreatedDate(deletedLesson.getLesson().getStudent(), deletedLesson.getLesson().getDiscipline());

    if (!deletedLesson.getIsUsed()) {
      if (abonement == null) {
        if (deletedLesson.getLesson().getIsSingleLesson()) {
          deletedLessonRepository.save(deletedLesson);
          return new ApiResponse(true, "Урок відмінено");
        }
        return new ApiResponse(false, "В даного учня немає проплачених занять");
      }

      List<DeletedLesson> deletedLessonsWithoutIsUsed = abonement.getDeletedLessons().stream()
          .filter(deletedLessonIsNotUsed -> !deletedLessonIsNotUsed.getIsUsed()).collect(Collectors.toList());
      if (deletedLessonsWithoutIsUsed.size() == abonement.getTransferedQuantity()) {
        return new ApiResponse(false, "Закінчився ліміт перенесених занять");
      }
      deletedLesson.setAbonement(abonement);
      deletedLessonRepository.save(deletedLesson);
      return new ApiResponse(true, "Урок відмінено без списання");
    }

    if (abonement == null) {
      return new ApiResponse(false, "В даного учня немає проплачених занять");
    }

    deletedLesson.setAbonement(abonement);
    abonement.setUsedQuantity(abonement.getUsedQuantity() + 1);
    deletedLessonRepository.save(deletedLesson);
    abonementRepository.save(abonement);
    return new ApiResponse(true, "Урок відмінено зі списанням заняття");
  }

  @Override
  public ApiResponse updateLesson(DeletedLesson deletedLesson, Long id) {
    DeletedLesson lessonFromDb = deletedLessonRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Lesson", "id", id));
    deletedLesson.setId(lessonFromDb.getId());
    deletedLessonRepository.save(deletedLesson);
    return new ApiResponse(true, "Дані оновлено");
  }

  @Override
  public ApiResponse deleteLesson(Long id) {
    DeletedLesson lessonFromDb = deletedLessonRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Lesson", "id", id));
    Abonement abonement = abonementRepository.findFirstByDeletedLessonsContains(lessonFromDb);
    if (lessonFromDb.getIsUsed()) {
      abonement.setUsedQuantity(abonement.getUsedQuantity() - 1);
    }

    deletedLessonRepository.delete(lessonFromDb);
    abonementRepository.save(abonement);
    return new ApiResponse(true, "Відміну заняття скасовано");
  }

  @Override
  public Page<DeletedLesson> findAllOrderByDate(Pageable pageable) {
    return deletedLessonRepository.findAllByOrderByCreatedDateDesc(pageable);
  }
}
