package com.app.service;

import com.app.dto.response.ApiResponse;
import com.app.exeption.ResourceNotFoundException;
import com.app.model.ConfirmedLesson;
import com.app.model.Credit;
import com.app.model.Student;
import com.app.repository.ConfirmedLessonRepository;
import com.app.repository.CreditRepository;
import com.app.repository.StudentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CreditServiceImpl implements CreditService{
  private final CreditRepository creditRepository;
  private final StudentRepository studentRepository;
  private final ConfirmedLessonRepository confirmedLessonRepository;

  @Override
  public List<Credit> findAllStudentCredits(Long id) {
    Student student = studentRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Student", "id", id));
    return creditRepository.findAllByStudent(student);
  }

  @Override
  public Page<Credit> findAll(Pageable pageable) {
    return creditRepository.findAllByOrderByCreatedDateDesc(pageable);
  }

  @Override
  public ApiResponse deleteCredit(Long id) {
    Credit credit = creditRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Credit", "id", id));
    creditRepository.delete(credit);
    return new ApiResponse(true, "Кредит видалено");
  }

  @Override
  public ApiResponse createCredit(ConfirmedLesson confirmedLesson) {
    ConfirmedLesson savedLesson = confirmedLessonRepository.save(confirmedLesson);
    Credit credit = new Credit();
    credit.setLesson(savedLesson.getLesson());
    credit.setStudent(savedLesson.getStudent());
    credit.setTeacher(savedLesson.getTeacher());
    credit.setLessonDate(savedLesson.getLessonDate());
    credit.setTime(savedLesson.getTime());
    Credit savedCredit = creditRepository.save(credit);
    if (savedCredit.getId() != null) {
      return new  ApiResponse(true, "Записано в кредит");
    }
    return new  ApiResponse(false, "Не вдалося записати на кредит");
  }
}
