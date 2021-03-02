package com.app.service;

import com.app.dto.response.ApiResponse;
import com.app.exeption.AppException;
import com.app.exeption.ResourceNotFoundException;
import com.app.model.Abonement;
import com.app.model.ConfirmedLesson;
import com.app.model.DeletedLesson;
import com.app.model.Lesson;
import com.app.model.Status;
import com.app.model.Student;
import com.app.model.Teacher;
import com.app.model.TransferLesson;
import com.app.repository.AbonementRepository;
import com.app.repository.ConfirmedLessonRepository;
import com.app.repository.DeletedLessonRepository;
import com.app.repository.LessonRepository;
import com.app.repository.StudentRepository;
import com.app.repository.TeacherRepository;
import com.app.repository.TransferLessonRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class TransferLessonServiceImpl implements TransferLessonService{
  private final TransferLessonRepository transferLessonRepository;
  private final ConfirmedLessonRepository confirmedLessonRepository;
  private final DeletedLessonRepository deletedLessonRepository;
  private final AbonementRepository abonementRepository;
  private final TeacherRepository teacherRepository;
  private final LessonRepository lessonRepository;

  @Override
  public Page<TransferLesson> getAllOrderByDate(Pageable pageable) {
    return transferLessonRepository.findAllByOrderByCreatedDateAsc(pageable);
  }

  @Override
  public TransferLesson getById(Long id) {
    return transferLessonRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("TransferLesson", "id", id));
  }

  @Override
  @Transactional
  public ApiResponse createTransferLesson(TransferLesson request) {
    List<ConfirmedLesson> confirmedLessons = confirmedLessonRepository.findAllByLessonDate(request.getLessonDate());
    List<TransferLesson> transferLessons = transferLessonRepository.findAllByLessonDate(request.getLessonDate());
    List<DeletedLesson> deletedLessons = deletedLessonRepository.findAllByLessonDate(request.getLessonDate());
    boolean confirmed = confirmedLessons.stream().anyMatch(lesson -> lesson.getLesson().getId() == request.getLesson().getId());
    boolean transfered = transferLessons.stream().anyMatch(lesson -> lesson.getLesson().getId() == request.getLesson().getId());
    boolean deleted = deletedLessons.stream().anyMatch(lesson -> lesson.getLesson().getId() == request.getLesson().getId());
    if (confirmed || transfered  || deleted) {
      throw new AppException("Lesson status is checked");
    }

    Abonement abonement = abonementRepository.findFirstByStudentAndIsActiveTrueOrderByCreatedDate(request.getLesson().getStudent());

    if (abonement == null) {
      return new ApiResponse(false, "В даного учня немає проплачених занять");
    }

    if (abonement.getTransferedQuantity() == abonement.getTransferLessons().size()) {
      return new ApiResponse(false, "По діючому абонементу вже не можна переносити заняття");
    }

    request.setAbonement(abonement);
    TransferLesson savedTransferLesson = transferLessonRepository.save(request);
    abonement.getTransferLessons().add(savedTransferLesson);
    abonement.setUsedLessons(abonement.getUsedLessons()+1);
    if (abonement.getQuantity() == abonement.getUsedLessons()) {
      abonement.setIsActive(false);
    }
    abonementRepository.save(abonement);

    return new ApiResponse(true, "Урок перенесено");
  }

  @Override
  public ApiResponse updateLesson(TransferLesson request, Long id) {
    TransferLesson transferLesson = transferLessonRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("TransferLesson", "id", id));
    if (transferLesson.getStatus() != null) {
      if (transferLesson.getStatus().equals(Status.CONFIRMED)) {
        return new ApiResponse(false, "Не можна змінювати підтвердженый урок");
      }
    }
    request.setId(transferLesson.getId());
    transferLessonRepository.save(request);
    return new ApiResponse(true, "Данні про перенесений урок змінено");
  }

  @Override
  @Transactional
  public ApiResponse confirmTransferLesson(ConfirmedLesson confirmedLesson, Long trasferLessonId) {
    TransferLesson transferLesson = transferLessonRepository.findById(trasferLessonId).orElseThrow(() -> new ResourceNotFoundException("TransferLesson", "id", trasferLessonId));
    List<ConfirmedLesson> confirmedLessons = confirmedLessonRepository.findAllByLessonDate(confirmedLesson.getLessonDate());
    List<TransferLesson> transferLessons = transferLessonRepository.findAllByLessonDate(confirmedLesson.getLessonDate());
    List<DeletedLesson> deletedLessons = deletedLessonRepository.findAllByLessonDate(confirmedLesson.getLessonDate());
    boolean confirmed = confirmedLessons.stream().anyMatch(lesson -> lesson.getLesson().getId() == confirmedLesson.getLesson().getId() && confirmedLesson.getTime().equals(lesson.getTime()));
    boolean transfered = transferLessons.stream().anyMatch(lesson -> lesson.getLesson().getId() == confirmedLesson.getLesson().getId() && lesson.getTransferTime().equals(confirmedLesson.getTime()));
    boolean deleted = deletedLessons.stream().anyMatch(lesson -> lesson.getLesson().getId() == confirmedLesson.getLesson().getId() && lesson.getLesson().getTime().equals(confirmedLesson.getTime()));
    if (confirmed || transfered  || deleted) {
      throw new AppException("Lesson status is checked");
    }

    Abonement abonement = abonementRepository.findFirstByTransferLessonsContains(transferLesson);

    confirmedLesson.setAbonement(abonement);
    confirmedLesson.setIsPaid(false);
    ConfirmedLesson savedConfirmedLesson = confirmedLessonRepository.save(confirmedLesson);
    abonement.getConfirmedLessons().add(savedConfirmedLesson);

    abonementRepository.save(abonement);
    transferLesson.setStatus(Status.CONFIRMED);
    transferLessonRepository.save(transferLesson);
    return new ApiResponse(true, "Урок підтверджено");
  }

  @Override
  @Transactional
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

    List<TransferLesson> transferLessons = transferLessonRepository.findAllByTransferDate(parseDate);

    return transferLessons;
  }

  @Override
  @Transactional
  public ApiResponse deleteLesson(Long id) {
    TransferLesson transferLesson = transferLessonRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("TransferLesson", "id", id));

    if (transferLesson.getStatus() != null) {
      if (transferLesson.getStatus().equals(Status.CONFIRMED)) {
        return new  ApiResponse(false, "Цей урок вже підтвкрджено");
      }
    }

    Abonement abonement = abonementRepository.findFirstByTransferLessonsContains(transferLesson);
    Teacher teacher = teacherRepository.findById(transferLesson.getTeacher().getId()).
        orElseThrow(() -> new ResourceNotFoundException("Teacher", "id", transferLesson.getTeacher().getId()));
    Lesson lesson = lessonRepository.findById(transferLesson.getLesson().getId())
        .orElseThrow(() -> new ResourceNotFoundException("Lesson", "id", transferLesson.getLesson().getId()));

    teacher.getTransferLessons().remove(transferLesson);
    lesson.getTransferLessons().remove(transferLesson);

    Set<TransferLesson> transfers = abonement.getTransferLessons().stream().filter(transfer -> transfer.getId() != transferLesson.getId()).collect(Collectors.toSet());
    abonement.setTransferLessons(transfers);
    abonement.setUsedLessons(abonement.getUsedLessons() - 1);
    abonement.setIsActive(true);
    abonementRepository.save(abonement);

    transferLessonRepository.delete(transferLesson);

    return new ApiResponse(true, "Перенесене заняття выдалено");
  }

  @Override
  public List<TransferLesson> findAllStudentActiveLessons(Long studentId) {
    List<TransferLesson> transferLessons = transferLessonRepository.findAllByIsActiveTrue();
    return transferLessons.stream().filter(transferLesson -> transferLesson.getLesson().getStudent().getId() == studentId).collect(Collectors.toList());
  }

  @Override
  public ApiResponse rejectTransferLesson(Long id) {
    TransferLesson transferLesson = transferLessonRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("TransferLesson", "id", id));
    transferLesson.setStatus(Status.DELETED);
    transferLesson.setIsActive(false);
    transferLessonRepository.save(transferLesson);
    return new ApiResponse(true, "Урок відмінено");
  }
}
