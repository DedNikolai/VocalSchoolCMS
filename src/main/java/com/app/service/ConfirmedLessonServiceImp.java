package com.app.service;

import com.app.dto.response.ApiResponse;
import com.app.exeption.AppException;
import com.app.exeption.ResourceNotFoundException;
import com.app.model.Abonement;
import com.app.model.ConfirmedLesson;
import com.app.model.DeletedLesson;
import com.app.model.Teacher;
import com.app.model.TransferLesson;
import com.app.repository.AbonementRepository;
import com.app.repository.ConfirmedLessonRepository;
import com.app.repository.DeletedLessonRepository;
import com.app.repository.TeacherRepository;
import com.app.repository.TransferLessonRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ConfirmedLessonServiceImp implements ConfirmedLessonService {
  private final ConfirmedLessonRepository confirmedLessonRepository;
  private final TransferLessonRepository transferLessonRepository;
  private final DeletedLessonRepository deletedLessonRepository;
  private final AbonementRepository abonementRepository;
  private final TeacherRepository teacherRepository;

  @Override
  public ConfirmedLesson getLessonById(Long id) {
    return confirmedLessonRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Lesson", "id", id));
  }

  @Override
  @Transactional
  public ApiResponse createLesson(ConfirmedLesson confirmedLesson) {
    List<ConfirmedLesson> confirmedLessons = confirmedLessonRepository.findAllByLessonDateAndLesson(confirmedLesson.getLessonDate(), confirmedLesson.getLesson());
    List<DeletedLesson> deletedLessons = deletedLessonRepository.findAllByLessonDateAndLesson(confirmedLesson.getLessonDate(), confirmedLesson.getLesson());
    boolean confirmed = confirmedLessons.size() != 0;
    boolean deleted = deletedLessons.size() != 0;
    if (confirmed || deleted) {
      return new ApiResponse(false, "Lesson status is checked");
    }

    Abonement abonement = abonementRepository.
        findFirstByStudentAndDisciplineOrderByCreatedDate(confirmedLesson.getLesson().getStudent(), confirmedLesson.getLesson().getDiscipline());

    if (abonement == null) {
      return new ApiResponse(false, "В даного учня немає проплачених занять");
    }

    confirmedLesson.setAbonement(abonement);
    confirmedLesson.setIsPaid(false);
    abonement.setUsedQuantity(abonement.getUsedQuantity() + 1);
    confirmedLessonRepository.save(confirmedLesson);
    abonementRepository.save(abonement);
    return new ApiResponse(true, "Урок підтверджено");
  }

  @Override
  public ApiResponse updateLesson(ConfirmedLesson confirmedLesson, Long id) {
    ConfirmedLesson lessonFromDb = confirmedLessonRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Lesson", "id", id));
    confirmedLesson.setId(lessonFromDb.getId());
    confirmedLessonRepository.save(confirmedLesson);
    return new ApiResponse(true, "Дані про заняття змінено");
  }

  @Override
  @Transactional
  public ApiResponse deleteLesson(Long id) {
    ConfirmedLesson lessonFromDb = confirmedLessonRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Lesson", "id", id));

    if (lessonFromDb.getIsPaid()) {
      return new  ApiResponse(false, "Не можна відаляты проплаченый урок");
    }

    Abonement abonement = abonementRepository.findFirstByConfirmedLessonsContains(lessonFromDb);
    Set<ConfirmedLesson> confirmedLessons = abonement.getConfirmedLessons().
        stream().filter(confirmedLesson -> confirmedLesson.getId() != lessonFromDb.getId()).collect(Collectors.toSet());
    abonement.setConfirmedLessons(confirmedLessons);
    abonement.setUsedQuantity(abonement.getUsedQuantity() - 1);
    abonementRepository.save(abonement);

    confirmedLessonRepository.delete(lessonFromDb);

    return new ApiResponse(true, "Урок відалено");
  }

  @Override
  public Page<ConfirmedLesson> findAllOrderByDate(Pageable pageable) {
    return confirmedLessonRepository.findAllByOrderByCreatedDateDesc(pageable);
  }

  @Override
  public List<ConfirmedLesson> findAllByTeacherNoPaid(Long teacherId) {
    Teacher teacher = teacherRepository.findById(teacherId).orElseThrow(() -> new ResourceNotFoundException("Teacher", "id", teacherId));
    List<ConfirmedLesson> confirmedLessons = confirmedLessonRepository.findAllByTeacherAndIsPaidFalse(teacher);
    return confirmedLessons;
  }

  @Override
  public ApiResponse payConfirmedLesson(Long id) {
    ConfirmedLesson lessonFromDb = confirmedLessonRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Lesson", "id", id));
    lessonFromDb.setIsPaid(true);
    confirmedLessonRepository.save(lessonFromDb);
    return new ApiResponse(true, "Урок проплачено вчытелю");
  }

  @Override
  public ApiResponse payAllConfirmedLessons(Long teacherId) {
    Teacher teacher = teacherRepository.findById(teacherId).orElseThrow(() -> new ResourceNotFoundException("Teacher", "id", teacherId));
    List<ConfirmedLesson> confirmedLessons = confirmedLessonRepository.findAllByTeacherAndIsPaidFalse(teacher);
    List<ConfirmedLesson> paidLessons = confirmedLessons.stream().map(confirmedLesson -> {
      confirmedLesson.setIsPaid(true);
      return confirmedLesson;
    }).collect(Collectors.toList());
    confirmedLessonRepository.saveAll(paidLessons);
    return new ApiResponse(true, "Усі Уроки проплачено вчытелю");
  }
}
