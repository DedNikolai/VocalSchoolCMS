package com.app.service;

import com.app.exeption.AppException;
import com.app.exeption.ResourceNotFoundException;
import com.app.model.ConfirmedLesson;
import com.app.model.DeletedLesson;
import com.app.model.Lesson;
import com.app.model.LessonDay;
import com.app.model.Student;
import com.app.model.TransferLesson;
import com.app.repository.ConfirmedLessonRepository;
import com.app.repository.DeletedLessonRepository;
import com.app.repository.LessonRepository;
import com.app.repository.StudentRepository;
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

@Service
@RequiredArgsConstructor
public class ConfirmedLessonServiceImp implements ConfirmedLessonService {
  private final ConfirmedLessonRepository confirmedLessonRepository;
  private final TransferLessonRepository transferLessonRepository;
  private final DeletedLessonRepository deletedLessonRepository;
  private final StudentRepository studentRepository;

  @Override
  public ConfirmedLesson getLessonById(Long id) {
    return confirmedLessonRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Lesson", "id", id));
  }

  @Override
  @Transactional
  public ConfirmedLesson createLesson(ConfirmedLesson confirmedLesson) {
    List<ConfirmedLesson> confirmedLessons = confirmedLessonRepository.findAllByLessonDate(confirmedLesson.getLessonDate());
    List<TransferLesson> transferLessons = transferLessonRepository.findAllByLessonDate(confirmedLesson.getLessonDate());
    List<DeletedLesson> deletedLessons = deletedLessonRepository.findAllByLessonDate(confirmedLesson.getLessonDate());
    boolean confirmed = confirmedLessons.stream().anyMatch(lesson -> lesson.getLesson().getId() == confirmedLesson.getLesson().getId());
    boolean transfered = transferLessons.stream().anyMatch(lesson -> lesson.getLesson().getId() == confirmedLesson.getLesson().getId());
    boolean deleted = deletedLessons.stream().anyMatch(lesson -> lesson.getLesson().getId() == confirmedLesson.getLesson().getId());
    if (confirmed || transfered  || deleted) {
      throw new AppException("Lesson status is checked");
    }
    Student student = studentRepository.findById(confirmedLesson.getStudent().getId()).orElseThrow(() -> new ResourceNotFoundException("Student", "id", confirmedLesson.getStudent().getId()));
    int lessonPrice = confirmedLesson.getPrice();
    int studentPayBalance = student.getPayBalance() - lessonPrice;
    student.setPayBalance(studentPayBalance);
    studentRepository.save(student);
    return confirmedLessonRepository.save(confirmedLesson);
  }

  @Override
  public ConfirmedLesson updateLesson(ConfirmedLesson confirmedLesson, Long id) {
    ConfirmedLesson lessonFromDb = confirmedLessonRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Lesson", "id", id));
    confirmedLesson.setId(lessonFromDb.getId());
    return confirmedLessonRepository.save(confirmedLesson);
  }

  @Override
  public void deleteLesson(Long id) {
    ConfirmedLesson lessonFromDb = confirmedLessonRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Lesson", "id", id));
    confirmedLessonRepository.delete(lessonFromDb);
  }

  @Override
  public Page<ConfirmedLesson> findAllOrderByDate(Pageable pageable) {
    return confirmedLessonRepository.findAllByOrderByCreatedDateDesc(pageable);
  }
}
