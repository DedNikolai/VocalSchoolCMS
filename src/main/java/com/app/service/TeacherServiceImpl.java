package com.app.service;

import com.app.exeption.ResourceNotFoundException;
import com.app.model.Teacher;
import com.app.repository.TeacherRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class TeacherServiceImpl implements TeacherService{
  private final TeacherRepository teacherRepository;

  @Override
  public Teacher getTeacherById(Long id) {
    Teacher teacher = teacherRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Student", "id", id));
    return teacher;
  }
}
