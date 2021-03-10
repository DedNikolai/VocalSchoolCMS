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
    return lessonRepository.findAllByStudentAndDeletedIsFalse(student).stream().filter(lesson -> !lesson.getDeleted()).collect(Collectors.toList());
  }

  @Override
  @Transactional
  public ApiResponse createLesson(Lesson lesson) {
    List<Lesson> lessonsByDay = lessonRepository.findAllByDayAndDeletedIsFalse(lesson.getDay());
    boolean isTimetableLessonForThisTime = lessonsByDay.stream().filter(item -> !item.getIsTestLesson() && item.getRoom().equals(lesson.getRoom()))
        .anyMatch(currentLesson -> !isAllowTime(lesson, currentLesson));
    List<Lesson> testLessonsForThisTime = lessonsByDay.stream().filter(item -> item.getIsTestLesson() && !isAllowTime(lesson, item))
        .collect(Collectors.toList());

    List<Lesson> testLessonForThisTimeInthisRoom = testLessonsForThisTime.stream().filter(currentLesson -> lesson.getRoom().equals(currentLesson.getRoom())).collect(Collectors.toList());
    List<Lesson> testLessonForThisTimeWithCurrentTeacher= testLessonsForThisTime.stream().filter(currentLesson -> lesson.getTeacher().getId() == currentLesson.getTeacher().getId()).collect(Collectors.toList());

    if (isTimetableLessonForThisTime) {
      return new ApiResponse(false, "На цей час в цьому кабінеті вже є урок");
    }

    if (testLessonForThisTimeWithCurrentTeacher.size() != 0) {
      return new ApiResponse(false,
          testLessonForThisTimeWithCurrentTeacher.get(0).getLessonDate()+" заплановано тестовый урок з " + testLessonForThisTimeWithCurrentTeacher.get(0).getTeacher().getFirstName()+
      " " + testLessonForThisTimeWithCurrentTeacher.get(0).getTeacher().getLastName() + " о "+testLessonForThisTimeWithCurrentTeacher.get(0).getTime());
    }

    if (testLessonForThisTimeInthisRoom.size() != 0) {
      return new ApiResponse(false,
          testLessonForThisTimeInthisRoom.get(0).getLessonDate()+ " в " + testLessonForThisTimeInthisRoom.get(0).getTime() + " Заплановано тестовый урок в класі " + testLessonForThisTimeInthisRoom.get(0).getRoom());
    }
    Teacher teacher = teacherRepository.findById(lesson.getTeacher().getId()).orElseThrow(() -> new ResourceNotFoundException("Teacher", "id", lesson.getTeacher().getId()));

    if (!isTeacherWorkTimes(teacher, lesson)) {
      return new ApiResponse(false, "Цей час не робочий для цього вяителя");
    }

    boolean isLessonForTeacherForThisTime = teacher.getLessons().stream().filter(currentLesson -> {
      return !currentLesson.getIsTestLesson() && currentLesson.getDay().equals(lesson.getDay());
    }).anyMatch(teacherLesson -> !isAllowTime(lesson, teacherLesson));

    if (isLessonForTeacherForThisTime) {
      return new ApiResponse(false, "В данного вчителя вже є урок на цей час");
    }

    List<TransferLesson> transferLessons = transferLessonRepository.findAllByDayAndIsActiveTrue(lesson.getDay());
    List<TransferLesson> transferLessonsWithCurrentTeacherForThisTime = transferLessons.stream()
        .filter(transferLesson -> !isAllowTimeForTransfer(lesson, transferLesson) && transferLesson.getTeacher().getId() == lesson.getTeacher().getId())
        .collect(Collectors.toList());
    List<TransferLesson> transferLessonInThisRoomForThisTime = transferLessons.stream()
        .filter(transferLesson -> !isAllowTimeForTransfer(lesson, transferLesson) && transferLesson.getRoom().equals(lesson.getRoom()))
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

    lessonRepository.save(lesson);
    return new ApiResponse(true, "Урок створено");
  }

  @Override
  @Transactional
  public Lesson deleteLesson(Long id) {
    Lesson lesson = lessonRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Lesson", "id", id));
    Teacher teacher = teacherRepository.findByLessonsContains(lesson);
    teacher.getLessons().remove(lesson);
    teacherRepository.save(teacher);
    lesson.setTeacher(null);
    lesson.setDeleted(true);
    return lessonRepository.save(lesson);
  }

  @Override
  public Lesson getLessonById(Long id) {
    Lesson lesson = lessonRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Lesson", "id", id));
    return lesson;
  }

  @Override
  public ApiResponse updateLesson(Lesson lesson, Long id) {
    Lesson lessonFromDb = lessonRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Lesson", "id", id));
    lesson.setId(lessonFromDb.getId());
    return createLesson(lesson);
  }

  @Override
  public List<Lesson> getAllLessons() {
    List<Lesson> lessons = lessonRepository.findAllByDeletedIsFalse().stream().filter(lesson -> !lesson.getDeleted()).collect(Collectors.toList());
    return lessons.stream().filter(lesson -> !lesson.getIsTestLesson()).collect(Collectors.toList());
  }

  public Date parseDate(Date date) {
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

    return parseDate;
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
    List<Lesson> lessons = lessonRepository.findAllByDayAndDeletedIsFalseOrderByTime(LessonDay.values()[cal.get(Calendar.DAY_OF_WEEK)-1]);
    List<ConfirmedLesson> confirmedLessons = confirmedLessonRepository.findAllByLessonDate(parseDate);
    List<TransferLesson> transferLessons = transferLessonRepository.findAllByLessonDate(parseDate);
    List<DeletedLesson> deletedLessons = deletedLessonRepository.findAllByLessonDate(parseDate);

    List<Lesson> lessonList = lessons.stream().map(lesson -> {
      boolean confirmed = confirmedLessons.stream().anyMatch(confirmedLesson -> confirmedLesson.getLesson().getId() == lesson.getId() && confirmedLesson.getTime().equals(lesson.getTime()));
      boolean transfered = transferLessons.stream().anyMatch(transferLesson -> transferLesson.getLesson().getId() == lesson.getId() && transferLesson.getTransferTime().equals(lesson.getTime()));
      boolean deleted = deletedLessons.stream().anyMatch(deletedLesson -> deletedLesson.getLesson().getId() == lesson.getId() && deletedLesson.getLesson().getTime().equals(lesson.getTime()));
      if (confirmed) {
        lesson.setStatus(Status.CONFIRMED);
      }

      if (transfered) {
        lesson.setStatus(Status.TRANSFERED);
      }

      if (deleted) {
        lesson.setStatus(Status.DELETED);
      }

      if (!transfered && !confirmed && !deleted) {
        lesson.setStatus(null);
      }

      return lesson;
    }).filter(lesson -> !lesson.getDeleted()).filter(lesson -> {
      if (!lesson.getIsTestLesson() || lesson.getIsTestLesson() && lesson.getLessonDate().equals(parseDate(date))) {
        return true;
      } else {
        return false;
      }
    }).collect(Collectors.toList());
    return lessonList;
  }

  @Override
  public List<Lesson> findAllbyLessonDay(String day) {
    return lessonRepository.findAllByDayAndDeletedIsFalse(LessonDay.valueOf(day)).stream().filter(lesson -> !lesson.getDeleted() && !lesson.getIsTestLesson()).collect(Collectors.toList());
  }

  public boolean isAllowTime(Lesson createdLesson, Lesson currentLesson) {
    int createdStart = Integer.parseInt(createdLesson.getTime().substring(0, 2))*60 + Integer.parseInt(createdLesson.getTime().substring(3));
    int createdEnd = createdStart + createdLesson.getDuration();
    int currentStart = Integer.parseInt(currentLesson.getTime().substring(0, 2))*60 + Integer.parseInt(currentLesson.getTime().substring(3));
    int currentEnd = currentStart + currentLesson.getDuration();

    if (createdEnd <= currentStart || createdStart >= currentEnd) {
      return true;
    }

    return false;
  }

  public boolean isAllowTimeForTransfer(Lesson createdLesson, TransferLesson currentLesson) {
    int createdStart = Integer.parseInt(createdLesson.getTime().substring(0, 2))*60 + Integer.parseInt(createdLesson.getTime().substring(3));
    int createdEnd = createdStart + createdLesson.getDuration();
    int currentStart = Integer.parseInt(currentLesson.getTransferTime().substring(0, 2))*60 + Integer.parseInt(currentLesson.getTransferTime().substring(3));
    int currentEnd = currentStart + currentLesson.getLesson().getDuration();

    if (createdEnd <= currentStart || createdStart >= currentEnd) {
      return true;
    }

    return false;
  }

  public boolean isTeacherWorkTimes(Teacher teacher, Lesson lesson) {
    int lessonStart = Integer.parseInt(lesson.getTime().substring(0, 2))*60 + Integer.parseInt(lesson.getTime().substring(3));
    int lessonEnd = lessonStart + lesson.getDuration();
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
}
