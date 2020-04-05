package com.app.service;

import com.app.exeption.ResourceNotFoundException;
import com.app.model.Lesson;
import com.app.model.Student;
import com.app.repository.LessonRepository;
import com.app.repository.StudentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class LessonServiceImpl implements LessonService {
  private final LessonRepository lessonRepository;
  private final StudentRepository studentRepository;

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
}
