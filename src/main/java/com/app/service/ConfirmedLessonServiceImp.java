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
    List<ConfirmedLesson> confirmedLessons = confirmedLessonRepository.findAllByLessonDate(confirmedLesson.getLessonDate());
    List<TransferLesson> transferLessons = transferLessonRepository.findAllByLessonDate(confirmedLesson.getLessonDate());
    List<DeletedLesson> deletedLessons = deletedLessonRepository.findAllByLessonDate(confirmedLesson.getLessonDate());
    boolean confirmed = confirmedLessons.stream().anyMatch(lesson -> lesson.getLesson().getId() == confirmedLesson.getLesson().getId() && confirmedLesson.getTime().equals(lesson.getTime()));
    boolean transfered = transferLessons.stream().anyMatch(lesson -> lesson.getLesson().getId() == confirmedLesson.getLesson().getId() && lesson.getTransferTime().equals(confirmedLesson.getTime()));
    boolean deleted = deletedLessons.stream().anyMatch(lesson -> lesson.getLesson().getId() == confirmedLesson.getLesson().getId() && lesson.getLesson().getTime().equals(confirmedLesson.getTime()));
    if (confirmed || transfered  || deleted) {
      throw new AppException("Lesson status is checked");
    }

    Abonement abonement = abonementRepository.findFirstByStudentAndIsActiveTrueOrderByCreatedDate(confirmedLesson.getStudent());

    if (abonement == null) {
      return new ApiResponse(false, "В даного учня немає проплачених занять");
    }

    confirmedLesson.setAbonement(abonement);
    ConfirmedLesson savedConfirmedLesson = confirmedLessonRepository.save(confirmedLesson);
    abonement.getConfirmedLessons().add(savedConfirmedLesson);
    abonement.setUsedLessons(abonement.getUsedLessons()+1);
    if (abonement.getQuantity() == abonement.getUsedLessons()) {
      abonement.setIsActive(false);
    }
    abonementRepository.save(abonement);
    return new ApiResponse(true, "Урок підтверджено");
  }

  @Override
  public ConfirmedLesson updateLesson(ConfirmedLesson confirmedLesson, Long id) {
    ConfirmedLesson lessonFromDb = confirmedLessonRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Lesson", "id", id));
    confirmedLesson.setId(lessonFromDb.getId());
    return confirmedLessonRepository.save(confirmedLesson);
  }

  @Override
  @Transactional
  public void deleteLesson(Long id) {
    ConfirmedLesson lessonFromDb = confirmedLessonRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Lesson", "id", id));
    Abonement abonement = abonementRepository.findFirstByConfirmedLessonsContains(lessonFromDb);
    if (abonement != null) {
      abonement.setUsedLessons(abonement.getUsedLessons() - 1);
      abonement.setIsActive(true);
      abonementRepository.save(abonement);
    }

    confirmedLessonRepository.delete(lessonFromDb);
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
