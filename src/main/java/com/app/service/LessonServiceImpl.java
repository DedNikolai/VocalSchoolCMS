package com.app.service;

import com.app.dto.response.ApiResponse;
import com.app.exeption.ResourceNotFoundException;
import com.app.model.ConfirmedLesson;
import com.app.model.DeletedLesson;
import com.app.model.Lesson;
import com.app.model.LessonDay;
import com.app.model.Status;
import com.app.model.Student;
import com.app.model.Teacher;
import com.app.model.TeacherWorkTime;
import com.app.model.TransferLesson;
import com.app.repository.ConfirmedLessonRepository;
import com.app.repository.DeletedLessonRepository;
import com.app.repository.LessonRepository;
import com.app.repository.StudentRepository;
import com.app.repository.TeacherRepository;
import com.app.repository.TransferLessonRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class LessonServiceImpl implements LessonService {
  private final LessonRepository lessonRepository;
  private final StudentRepository studentRepository;
  private final TeacherRepository teacherRepository;
  private final ConfirmedLessonRepository confirmedLessonRepository;
  private final TransferLessonRepository transferLessonRepository;
  private final DeletedLessonRepository deletedLessonRepository;

  @Override
  public List<Lesson> getLessonsByStudent(Long id) {
    Student student = studentRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Student", "id", id));
    return lessonRepository.findAllByStudentOrderByLessonStartDateDesc(student);
  }

  @Override
  public List<Lesson> getAllLessonsByDates(Date startDate, Date finishDate) {
    return lessonRepository.findAllByDates(startDate, finishDate);
  }

  @Override
  @Transactional
  public ApiResponse createLesson(Lesson lesson) {
    List<Lesson> lessonsFromDb = lessonRepository.findAllByLessonFinishDateIsNotExpire(lesson.getLessonStartDate(), lesson.getDay());
    List<Lesson> reletiveLessons = lessonsFromDb.stream().filter(item -> isTheSameTime(item, lesson)).collect(Collectors.toList());
    Teacher teacher = teacherRepository.findById(lesson.getTeacher().getId())
        .orElseThrow(() -> new ResourceNotFoundException("Teacher", "id", lesson.getTeacher().getId()));

    if (!isTeacherWorkTime(teacher, lesson)) {
      return new ApiResponse(false, "Не робочий час для цього вчителя");
    }

    for (Lesson key : reletiveLessons) {
      String str = "";
      if (key.getRoom().equals(lesson.getRoom())) {
        if (key.getIsSingleLesson()) {
          str = key.getLessonStartDate() + " нацей час в цьому класі заплановано разове заняття";
        } else {
          str = "Цей клас занятый в даний час";
        }

      }

      if (key.getTeacher().getId() == lesson.getTeacher().getId()) {
        if (key.getIsSingleLesson()) {
          str = key.getLessonStartDate() + " у вяителя " + key.getTeacher().getFirstName() + " " + key.getTeacher().getLastName()
              + " заплановано разове заняття";
        } else {
          str = "На цей клас" + " у " + key.getTeacher().getFirstName() + " " + key.getTeacher().getLastName()
              + " вже є заняття";
        }

      }

      return new ApiResponse(false, str);
    }

    lessonRepository.save(lesson);
    return new ApiResponse(true, "Урок створено");
  }

  @Override
  public ApiResponse updateLesson(Lesson lesson, Long id) {
    Lesson lessonFromDb = lessonRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Lesson", "id", id));
    List<Lesson> lessonsFromDb = lessonRepository.findAllByLessonFinishDateIsNotExpire(lesson.getLessonStartDate(), lesson.getDay());
    List<Lesson> reletiveLessons = lessonsFromDb.stream().filter(item -> isTheSameTime(item, lesson)).collect(Collectors.toList());
    Teacher teacher = teacherRepository.findById(lesson.getTeacher().getId())
        .orElseThrow(() -> new ResourceNotFoundException("Teacher", "id", lesson.getTeacher().getId()));

    if (!isTeacherWorkTime(teacher, lesson)) {
      return new ApiResponse(false, "Не робочий час для цього вчителя");
    }

    for (Lesson key : reletiveLessons) {
      String str = "";
      if (key.getRoom().equals(lesson.getRoom())) {
        if (key.getIsSingleLesson()) {
          str = key.getLessonStartDate() + " нацей час в цьому класі заплановано разове заняття";
        } else {
          str = "Цей клас занятый в даний час";
        }

      }

      if (key.getTeacher().getId() == lesson.getTeacher().getId()) {
        if (key.getIsSingleLesson()) {
          str = key.getLessonStartDate() + " у вяителя " + key.getTeacher().getFirstName() + " " + key.getTeacher().getLastName()
              + " заплановано разове заняття";
        } else {
          str = "На цей клас" + " у " + key.getTeacher().getFirstName() + " " + key.getTeacher().getLastName()
              + " вже є заняття";
        }

      }

      return new ApiResponse(false, str);
    }

    lessonRepository.save(lesson);
    return new ApiResponse(true, "Урок змінено");
  }

  @Override
  @Transactional
  public ApiResponse deleteLesson(Long id) {
    return new ApiResponse(false, "не реализовано");
  }

  @Override
  public Lesson getLessonById(Long id) {
    Lesson lesson = lessonRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Lesson", "id", id));
    return lesson;
  }


  @Override
  public List<Lesson> getAllLessons() {
    List<Lesson> lessons = lessonRepository.findAll();
    return lessons.stream().filter(lesson -> !lesson.getIsSingleLesson()).collect(Collectors.toList());
  }

  @Override
  @Transactional
  public List<Lesson> getAllbyDay(Date date) {
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
    List<Lesson> lessons = lessonRepository.findAllByDayOrderByTime(LessonDay.values()[cal.get(Calendar.DAY_OF_WEEK)-1]);
//    List<ConfirmedLesson> confirmedLessons = confirmedLessonRepository.findAllByLessonDate(parseDate);
//    List<TransferLesson> transferLessons = transferLessonRepository.findAllByLessonDate(parseDate);
//    List<DeletedLesson> deletedLessons = deletedLessonRepository.findAllByLessonDate(parseDate);
//
//    List<Lesson> lessonList = lessons.stream().map(lesson -> {
//      boolean confirmed = confirmedLessons.stream().anyMatch(confirmedLesson -> confirmedLesson.getLesson().getId() == lesson.getId() && confirmedLesson.getTime().equals(lesson.getTime()));
//      boolean transfered = transferLessons.stream().anyMatch(transferLesson -> transferLesson.getLesson().getId() == lesson.getId() && transferLesson.getTransferTime().equals(lesson.getTime()));
//      boolean deleted = deletedLessons.stream().anyMatch(deletedLesson -> deletedLesson.getLesson().getId() == lesson.getId() && deletedLesson.getLesson().getTime().equals(lesson.getTime()));
//      if (confirmed) {
//        lesson.setStatus(Status.CONFIRMED);
//      }
//
//      if (transfered) {
//        lesson.setStatus(Status.TRANSFERED);
//      }
//
//      if (deleted) {
//        lesson.setStatus(Status.DELETED);
//      }
//
//      if (!transfered && !confirmed && !deleted) {
//        lesson.setStatus(null);
//      }
//
//      return lesson;
//    }).map(lesson -> {
//          Student student = lesson.getStudent();
//          Integer balance = student.getAbonements()
//              .stream().filter(abonement -> abonement.getIsActive() && abonement.getDiscipline().equals(lesson.getDiscipline()))
//              .reduce(0, (partialAgeResult, abonement) -> partialAgeResult + abonement.getQuantity() - abonement.getConfirmedLessons().size(), Integer::sum);
//          lesson.setCurrentStudenBalance(balance);
//          return lesson;
//        })
//        .collect(Collectors.toList());
    return lessons;
  }

  @Override
  public List<Lesson> findAllbyLessonDay(String day) {
    return lessonRepository.findAllByDay(LessonDay.valueOf(day)).stream().filter(lesson -> !lesson.getIsSingleLesson()).collect(Collectors.toList());
  }


  public boolean isTheSameTime(Lesson lessonFromDb, Lesson lesson) {
    int lessonFromDbStartTime = Integer.parseInt(lessonFromDb.getTime().substring(0, 2))*60 + Integer.parseInt(lessonFromDb.getTime().substring(3));
    int lessonFromDbFinishTime = Integer.parseInt(lessonFromDb.getTime().substring(0, 2))*60 + Integer.parseInt(lessonFromDb.getTime().substring(3)) + lessonFromDb.getDuration();
    int lessonStartTime = Integer.parseInt(lesson.getTime().substring(0, 2))*60 + Integer.parseInt(lesson.getTime().substring(3));
    int lessonFinishTime = Integer.parseInt(lesson.getTime().substring(0, 2))*60 + Integer.parseInt(lesson.getTime().substring(3)) + lesson.getDuration();

    if (lessonStartTime >= lessonFromDbStartTime && lessonStartTime < lessonFromDbFinishTime) {
      return true;
    }

    if (lessonFinishTime > lessonFromDbStartTime && lessonFinishTime <= lessonFromDbFinishTime) {
      return true;
    }

    return false;
  }

  public boolean isTeacherWorkTime(Teacher teacher, Lesson lesson) {
    List<TeacherWorkTime> workTimes = teacher.getWorkTimes().stream()
        .filter(teacherWorkTime -> teacherWorkTime.getDay().equals(lesson.getDay()))
        .collect(Collectors.toList());
    for (TeacherWorkTime time : workTimes) {
      int startWorkTime = Integer.parseInt(time.getStartTime().substring(0, 2))*60 + Integer.parseInt(time.getStartTime().substring(3));
      int endWorkTime = Integer.parseInt(time.getEndTime().substring(0, 2))*60 + Integer.parseInt(time.getEndTime().substring(3));
      int lessonStartTime = Integer.parseInt(lesson.getTime().substring(0, 2))*60 + Integer.parseInt(lesson.getTime().substring(3));
      int lessonFinishTime = Integer.parseInt(lesson.getTime().substring(0, 2))*60 + Integer.parseInt(lesson.getTime().substring(3)) + lesson.getDuration();

      if (lessonStartTime >= startWorkTime && lessonFinishTime <= endWorkTime) {
        return true;
      }
    }

    return false;
  }
}
