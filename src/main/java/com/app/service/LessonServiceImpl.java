package com.app.service;

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
    return lessonRepository.findAllByStudent(student);
  }

  @Override
  public Lesson createLesson(Lesson lesson) {
    return lessonRepository.save(lesson);
  }

  @Override
  public Lesson deleteLesson(Long id) {
    Lesson lesson = lessonRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Lesson", "id", id));
    Student student = studentRepository.findByLessonsContains(lesson);
    student.getLessons().remove(lesson);
    studentRepository.save(student);
    Teacher teacher = teacherRepository.findByLessonsContains(lesson);
    teacher.getLessons().remove(lesson);
    teacherRepository.save(teacher);
    lessonRepository.delete(lesson);
    return lesson;
  }

  @Override
  public Lesson getLessonById(Long id) {
    Lesson lesson = lessonRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Lesson", "id", id));
    return lesson;
  }

  @Override
  public Lesson updateLesson(Lesson lesson, Long id) {
    Lesson lessonFromDb = lessonRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Lesson", "id", id));
    lesson.setId(lessonFromDb.getId());
    return lessonRepository.save(lesson);
  }

  @Override
  public List<Lesson> getAllLessons() {
    return lessonRepository.findAll();
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
    List<ConfirmedLesson> confirmedLessons = confirmedLessonRepository.findAllByLessonDate(parseDate);
    List<TransferLesson> transferLessons = transferLessonRepository.findAllByLessonDate(parseDate);
    List<DeletedLesson> deletedLessons = deletedLessonRepository.findAllByLessonDate(parseDate);

    List<Lesson> lessonList = lessons.stream().map(lesson -> {
      boolean confirmed = confirmedLessons.stream().anyMatch(confirmedLesson -> confirmedLesson.getLesson().getId() == lesson.getId());
      boolean transfered = transferLessons.stream().anyMatch(transferLesson -> transferLesson.getLesson().getId() == lesson.getId());
      boolean deleted = deletedLessons.stream().anyMatch(deletedLesson -> deletedLesson.getLesson().getId() == lesson.getId());
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
    }).collect(Collectors.toList());
    return lessonList;
  }

  @Override
  public List<Lesson> findAllbyLessonDay(String day) {
    return lessonRepository.findAllByDay(LessonDay.valueOf(day));
  }
}
