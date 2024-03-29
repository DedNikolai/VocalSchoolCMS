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
//    List<ConfirmedLesson> confirmedLessons = confirmedLessonRepository.findAllByLessonDate(request.getLessonDate());
//    List<TransferLesson> transferLessons = transferLessonRepository.findAllByLessonDate(request.getLessonDate());
//    List<DeletedLesson> deletedLessons = deletedLessonRepository.findAllByLessonDate(request.getLessonDate());
//    boolean confirmed = confirmedLessons.stream().anyMatch(lesson -> lesson.getLesson().getId() == request.getLesson().getId());
//    boolean transfered = transferLessons.stream().anyMatch(lesson -> lesson.getLesson().getId() == request.getLesson().getId());
//    boolean deleted = deletedLessons.stream().anyMatch(lesson -> lesson.getLesson().getId() == request.getLesson().getId());
//    if (confirmed || transfered  || deleted) {
//      throw new AppException("Lesson status is checked");
//    }
//
//    Abonement abonement = abonementRepository.
//        findFirstByStudentAndDisciplineAndIsActiveTrueOrderByCreatedDate(request.getLesson().getStudent(), request.getLesson().getDiscipline());
//
//    if (abonement == null) {
//      return new ApiResponse(false, "В даного учня немає проплачених занять");
//    }
//
//    if (abonement.getTransferedQuantity() == abonement.getTransferLessons().size()) {
//      return new ApiResponse(false, "По діючому абонементу вже не можна переносити заняття");
//    }
//
//    List<Lesson> lessonsByDay = lessonRepository.findAllByDay(request.getDay());
//    boolean isTimetableLessonForThisTime = lessonsByDay.stream().filter(item -> !item.getIsSingleLesson() && item.getRoom().equals(request.getRoom()))
//        .anyMatch(currentLesson -> !isAllowTime(request, currentLesson));
//    List<Lesson> testLessonsForThisTime = lessonsByDay.stream().filter(item -> item.getIsSingleLesson() && !isAllowTime(request, item))
//        .collect(Collectors.toList());
//
//    List<Lesson> testLessonForThisTimeInthisRoom = testLessonsForThisTime.stream().filter(currentLesson -> request.getRoom().equals(currentLesson.getRoom())).collect(Collectors.toList());
//    List<Lesson> testLessonForThisTimeWithCurrentTeacher= testLessonsForThisTime.stream().filter(currentLesson -> request.getTeacher().getId() == currentLesson.getTeacher().getId()).collect(Collectors.toList());
//
//    if (isTimetableLessonForThisTime) {
//      return new ApiResponse(false, "На цей час в цьому кабінеті вже є урок");
//    }
//
//    if (testLessonForThisTimeWithCurrentTeacher.size() != 0) {
//      return new ApiResponse(false,
//          testLessonForThisTimeWithCurrentTeacher.get(0).getLessonStartDate()+" заплановано тестовый урок з " + testLessonForThisTimeWithCurrentTeacher.get(0).getTeacher().getFirstName()+
//              " " + testLessonForThisTimeWithCurrentTeacher.get(0).getTeacher().getLastName() + " о "+testLessonForThisTimeWithCurrentTeacher.get(0).getTime());
//    }
//
//    if (testLessonForThisTimeInthisRoom.size() != 0) {
//      return new ApiResponse(false,
//          testLessonForThisTimeInthisRoom.get(0).getLessonStartDate()+ " в " + testLessonForThisTimeInthisRoom.get(0).getTime() + " Заплановано тестовый урок в класі " + testLessonForThisTimeInthisRoom.get(0).getRoom());
//    }
//    Teacher teacher = teacherRepository.findById(request.getTeacher().getId()).orElseThrow(() -> new ResourceNotFoundException("Teacher", "id", request.getTeacher().getId()));
//
//    if (!isTeacherWorkTimes(teacher, request)) {
//      return new ApiResponse(false, "Цей час не робочий для цього вяителя");
//    }
//
//    boolean isLessonForTeacherForThisTime = teacher.getLessons().stream().filter(currentLesson -> {
//      return !currentLesson.getIsSingleLesson() && currentLesson.getDay().equals(request.getDay());
//    }).anyMatch(teacherLesson -> !isAllowTime(request, teacherLesson));
//
//    if (isLessonForTeacherForThisTime) {
//      return new ApiResponse(false, "В данного вчеителя вже є урок на цей час");
//    }
//
//    List<TransferLesson> transferLessonsByDay = transferLessonRepository.findAllByDayAndIsActiveTrue(request.getDay());
//    List<TransferLesson> transferLessonsWithCurrentTeacherForThisTime = transferLessonsByDay.stream()
//        .filter(transferLesson -> !isAllowTimeForTransfer(request, transferLesson) && transferLesson.getTeacher().getId() == request.getTeacher().getId())
//        .collect(Collectors.toList());
//    List<TransferLesson> transferLessonInThisRoomForThisTime = transferLessonsByDay.stream()
//        .filter(transferLesson -> !isAllowTimeForTransfer(request, transferLesson) && transferLesson.getRoom().equals(request.getRoom()))
//        .collect(Collectors.toList());
//
//    if (transferLessonsWithCurrentTeacherForThisTime.size() != 0) {
//      return new ApiResponse(false,
//          transferLessonsWithCurrentTeacherForThisTime.get(0).getLessonDate()+" заплановано перенесеный урок з " + transferLessonsWithCurrentTeacherForThisTime.get(0).getTeacher().getFirstName()+
//              " " + transferLessonsWithCurrentTeacherForThisTime.get(0).getTeacher().getLastName() + " о "+transferLessonsWithCurrentTeacherForThisTime.get(0).getTransferTime());
//    }
//
//    if (transferLessonInThisRoomForThisTime.size() != 0) {
//      return new ApiResponse(false,
//          transferLessonInThisRoomForThisTime.get(0).getLessonDate()+ " в " + transferLessonInThisRoomForThisTime.get(0).getTransferTime() + " Заплановано перенесеный урок в класі " + transferLessonInThisRoomForThisTime.get(0).getRoom());
//    }
//
//    request.setAbonement(abonement);
//    TransferLesson savedTransferLesson = transferLessonRepository.save(request);
//    abonement.getTransferLessons().add(savedTransferLesson);
//    abonement.setUsedLessons(abonement.getUsedLessons()+1);
//    if (abonement.getQuantity() == abonement.getUsedLessons()) {
//      abonement.setIsActive(false);
//    }
//    abonementRepository.save(abonement);

    return new ApiResponse(true, "Урок перенесено");
  }

  @Override
  public ApiResponse updateLesson(TransferLesson request, Long id) {
    TransferLesson transferLessonById = transferLessonRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("TransferLesson", "id", id));
    if (transferLessonById.getStatus() != null) {
      if (transferLessonById.getStatus().equals(Status.CONFIRMED)) {
        return new ApiResponse(false, "Не можна змінювати підтвердженый урок");
      }
    }

    List<Lesson> lessonsByDay = lessonRepository.findAllByDay(request.getDay());
    boolean isTimetableLessonForThisTime = lessonsByDay.stream().filter(item -> !item.getIsSingleLesson() && item.getRoom().equals(request.getRoom()))
        .anyMatch(currentLesson -> !isAllowTime(request, currentLesson));
    List<Lesson> testLessonsForThisTime = lessonsByDay.stream().filter(item -> item.getIsSingleLesson() && !isAllowTime(request, item))
        .collect(Collectors.toList());

    List<Lesson> testLessonForThisTimeInthisRoom = testLessonsForThisTime.stream().filter(currentLesson -> request.getRoom().equals(currentLesson.getRoom())).collect(Collectors.toList());
    List<Lesson> testLessonForThisTimeWithCurrentTeacher= testLessonsForThisTime.stream().filter(currentLesson -> request.getTeacher().getId() == currentLesson.getTeacher().getId()).collect(Collectors.toList());

    if (isTimetableLessonForThisTime) {
      return new ApiResponse(false, "На цей час в цьому кабінеті вже є урок");
    }

    if (testLessonForThisTimeWithCurrentTeacher.size() != 0) {
      return new ApiResponse(false,
          testLessonForThisTimeWithCurrentTeacher.get(0).getLessonStartDate()+" заплановано тестовый урок з " + testLessonForThisTimeWithCurrentTeacher.get(0).getTeacher().getFirstName()+
              " " + testLessonForThisTimeWithCurrentTeacher.get(0).getTeacher().getLastName() + " о "+testLessonForThisTimeWithCurrentTeacher.get(0).getTime());
    }

    if (testLessonForThisTimeInthisRoom.size() != 0) {
      return new ApiResponse(false,
          testLessonForThisTimeInthisRoom.get(0).getLessonStartDate()+ " в " + testLessonForThisTimeInthisRoom.get(0).getTime() + " Заплановано тестовый урок в класі " + testLessonForThisTimeInthisRoom.get(0).getRoom());
    }
    Teacher teacher = teacherRepository.findById(request.getTeacher().getId()).orElseThrow(() -> new ResourceNotFoundException("Teacher", "id", request.getTeacher().getId()));

    if (!isTeacherWorkTimes(teacher, request)) {
      return new ApiResponse(false, "Цей час не робочий для цього вяителя");
    }

    boolean isLessonForTeacherForThisTime = teacher.getLessons().stream().filter(currentLesson -> {
      return !currentLesson.getIsSingleLesson() && currentLesson.getDay().equals(request.getDay());
    }).anyMatch(teacherLesson -> !isAllowTime(request, teacherLesson));

    if (isLessonForTeacherForThisTime) {
      return new ApiResponse(false, "В данного вчеителя вже є урок на цей час");
    }

    List<TransferLesson> transferLessonsByDay = transferLessonRepository.findAllByDayAndIsActiveTrue(request.getDay());
    List<TransferLesson> transferLessonsWithCurrentTeacherForThisTime = transferLessonsByDay.stream()
        .filter(transferLesson -> !isAllowTimeForTransfer(request, transferLesson) && transferLesson.getTeacher().getId() == request.getTeacher().getId())
        .collect(Collectors.toList());
    List<TransferLesson> transferLessonInThisRoomForThisTime = transferLessonsByDay.stream()
        .filter(transferLesson -> !isAllowTimeForTransfer(request, transferLesson) && transferLesson.getRoom().equals(request.getRoom()))
        .collect(Collectors.toList());

    if (transferLessonsWithCurrentTeacherForThisTime.size() != 0) {
      return new ApiResponse(false,
          transferLessonsWithCurrentTeacherForThisTime.get(0).getLessonDate()+" заплановано перенесеный урок з " + transferLessonsWithCurrentTeacherForThisTime.get(0).getTeacher().getFirstName()+
              " " + transferLessonsWithCurrentTeacherForThisTime.get(0).getTeacher().getLastName() + " о "+transferLessonsWithCurrentTeacherForThisTime.get(0).getTransferTime());
    }

    if (transferLessonInThisRoomForThisTime.size() != 0) {
      return new ApiResponse(false,
          transferLessonInThisRoomForThisTime.get(0).getLessonDate()+ " в " + transferLessonInThisRoomForThisTime.get(0).getTransferTime() + " Заплановано перенесеный урок в класі " + transferLessonInThisRoomForThisTime.get(0).getRoom());
    }

    request.setId(transferLessonById.getId());
    transferLessonRepository.save(request);
    return new ApiResponse(true, "Данні про перенесений урок змінено");
  }

  @Override
  @Transactional
  public ApiResponse confirmTransferLesson(ConfirmedLesson confirmedLesson, Long trasferLessonId) {
//    TransferLesson transferLesson = transferLessonRepository.findById(trasferLessonId).orElseThrow(() -> new ResourceNotFoundException("TransferLesson", "id", trasferLessonId));
//    List<ConfirmedLesson> confirmedLessons = confirmedLessonRepository.findAllByLessonDate(confirmedLesson.getLessonDate());
//    List<TransferLesson> transferLessons = transferLessonRepository.findAllByLessonDate(confirmedLesson.getLessonDate());
//    List<DeletedLesson> deletedLessons = deletedLessonRepository.findAllByLessonDate(confirmedLesson.getLessonDate());
//    boolean confirmed = confirmedLessons.stream().anyMatch(lesson -> lesson.getLesson().getId() == confirmedLesson.getLesson().getId() && confirmedLesson.getTime().equals(lesson.getTime()));
//    boolean transfered = transferLessons.stream().anyMatch(lesson -> lesson.getLesson().getId() == confirmedLesson.getLesson().getId() && lesson.getTransferTime().equals(confirmedLesson.getTime()));
//    boolean deleted = deletedLessons.stream().anyMatch(lesson -> lesson.getLesson().getId() == confirmedLesson.getLesson().getId() && lesson.getLesson().getTime().equals(confirmedLesson.getTime()));
//    if (confirmed || transfered  || deleted) {
//      throw new AppException("Lesson status is checked");
//    }
//
//    Abonement abonement = abonementRepository.findFirstByTransferLessonsContains(transferLesson);
//
//    confirmedLesson.setAbonement(abonement);
//    confirmedLesson.setIsPaid(false);
//    ConfirmedLesson savedConfirmedLesson = confirmedLessonRepository.save(confirmedLesson);
//    abonement.getConfirmedLessons().add(savedConfirmedLesson);
//
//    abonementRepository.save(abonement);
//    transferLesson.setStatus(Status.CONFIRMED);
//    transferLessonRepository.save(transferLesson);
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

    List<TransferLesson> transferLessons = transferLessonRepository.findAllByTransferDateAndIsActiveTrue(parseDate);

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

    Abonement abonement = abonementRepository.findById(1L).orElse(null);
    Teacher teacher = teacherRepository.findById(transferLesson.getTeacher().getId()).
        orElseThrow(() -> new ResourceNotFoundException("Teacher", "id", transferLesson.getTeacher().getId()));
    Lesson lesson = lessonRepository.findById(transferLesson.getLesson().getId())
        .orElseThrow(() -> new ResourceNotFoundException("Lesson", "id", transferLesson.getLesson().getId()));

//    teacher.getTransferLessons().remove(transferLesson);
//    lesson.getTransferLessons().remove(transferLesson);

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

  public boolean isAllowTime(TransferLesson createdLesson, Lesson currentLesson) {

    return false;
  }

  public boolean isTeacherWorkTimes(Teacher teacher, TransferLesson lesson) {
    int lessonStart = Integer.parseInt(lesson.getTransferTime().substring(0, 2))*60 + Integer.parseInt(lesson.getTransferTime().substring(3));
    int lessonEnd = lessonStart + lesson.getLesson().getDuration();
    return teacher.getWorkTimes().stream().filter(workTime -> workTime.getDay().equals(lesson.getDay())).anyMatch(worktime -> {
      int teacherStartTime = Integer.parseInt(worktime.getStartTime().substring(0, 2))*60 + Integer.parseInt(worktime.getStartTime().substring(3));
      int teacherEndTime = Integer.parseInt(worktime.getEndTime().substring(0, 2))*60 + Integer.parseInt(worktime.getEndTime().substring(3));
      if (lessonStart >= teacherStartTime && lessonEnd <= teacherEndTime) {
        return true;
      } else {
        return false;
      }
    });
  }

  public boolean isAllowTimeForTransfer(TransferLesson createdLesson, TransferLesson currentLesson) {
    int createdStart = Integer.parseInt(createdLesson.getTransferTime().substring(0, 2))*60 + Integer.parseInt(createdLesson.getTransferTime().substring(3));
    int createdEnd = createdStart + createdLesson.getLesson().getDuration();
    int currentStart = Integer.parseInt(currentLesson.getTransferTime().substring(0, 2))*60 + Integer.parseInt(currentLesson.getTransferTime().substring(3));
    int currentEnd = currentStart + currentLesson.getLesson().getDuration();

    if (createdEnd <= currentStart || createdStart >= currentEnd) {
      return true;
    }

    return false;
  }
}
