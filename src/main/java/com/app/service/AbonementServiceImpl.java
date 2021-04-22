package com.app.service;

import com.app.dto.response.ApiResponse;
import com.app.exeption.ResourceNotFoundException;
import com.app.model.Abonement;
import com.app.model.ConfirmedLesson;
import com.app.model.DeletedLesson;
import com.app.model.Student;
import com.app.repository.AbonementRepository;
import com.app.repository.ConfirmedLessonRepository;
import com.app.repository.DeletedLessonRepository;
import com.app.repository.StudentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class AbonementServiceImpl implements AbonementService{
  private final AbonementRepository abonementRepository;
  private final StudentRepository studentRepository;
  private final ConfirmedLessonRepository confirmedLessonRepository;
  private final DeletedLessonRepository deletedLessonRepository;


  @Override
  public Abonement getById(Long id) {
    Abonement abonement = abonementRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Abonement", "id", id));
    return abonement;
  }

  @Override
  public Abonement createAbonement(Abonement abonement) {
    return abonementRepository.save(abonement);
  }

  @Override
  public Abonement updateAbonement(Abonement abonement, Long id) {
    Abonement abonementFromDb = abonementRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Abonement", "id", id));
    abonement.setId(abonementFromDb.getId());
    return abonementRepository.save(abonement);

  }

  @Override
  public ApiResponse deleteAbonement(Long id) {
    Abonement abonement = abonementRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Abonement", "id", id));
    List<ConfirmedLesson> confirmedLessons = confirmedLessonRepository.findAllByAbonement(abonement);
    List<DeletedLesson> deletedLessons = deletedLessonRepository.findAllByAbonement(abonement);

    if (confirmedLessons.size() != 0 || deletedLessons.size() != 0) {
      return new ApiResponse(false, "Не вдалося відалити, оскільки заняття пов'язані з цим абонементом");
    }

    abonementRepository.delete(abonement);
    return new ApiResponse(true, "Абонемент видалено");
  }

  @Override
  public Page<Abonement> findAll(Pageable pageable) {
    return abonementRepository.findAllByOrderByCreatedDateDesc(pageable);
  }

  @Override
  public List<Abonement> findAllByStudent(Long studentId) {
    Student student = studentRepository.findById(studentId).orElseThrow(() -> new ResourceNotFoundException("Student", "id", studentId));
    List<Abonement> abonements = abonementRepository.findAllByStudent(student);
    return abonements;
  }

  @Override
  public Set<Abonement> findAllByDates(Date startDate, Date endDate) {
    Set<Abonement> abonements = abonementRepository.findAllByDates(startDate, endDate);
    return abonements;
  }

}
