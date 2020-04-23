package com.app.service;

import com.app.exeption.ResourceNotFoundException;
import com.app.model.Teacher;
import com.app.model.TeacherWorkTime;
import com.app.repository.TeacherRepository;
import com.app.repository.TeacherWorkTimeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class TeacherWorkTimeServiceImpl implements TeacherWorkTimeService {
  private final TeacherWorkTimeRepository teacherWorkTimeRepository;
  private final TeacherRepository teacherRepository;

  @Override
  public List<TeacherWorkTime> getAllByTeacher(Long teacherId) {
    Teacher teacher = teacherRepository.findById(teacherId).orElseThrow(() -> new ResourceNotFoundException("Teacher", "id", teacherId));
    return teacherWorkTimeRepository.findAllByTeacher(teacher);
  }

  @Override
  public TeacherWorkTime getById(Long id) {
    TeacherWorkTime teacherWorkTime = teacherWorkTimeRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Worktime", "id", id));
    return teacherWorkTime;
  }

  @Override
  public TeacherWorkTime create(Long teacherId, TeacherWorkTime teacherWorkTime) {
    Teacher teacher = teacherRepository.findById(teacherId).orElseThrow(() -> new ResourceNotFoundException("Teacher", "id", teacherId));
    teacherWorkTime.setTeacher(teacher);
    return teacherWorkTimeRepository.save(teacherWorkTime);
  }

  @Override
  public TeacherWorkTime update(Long id, TeacherWorkTime teacherWorkTime) {
    TeacherWorkTime workTime = teacherWorkTimeRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Worktime", "id", id));
    teacherWorkTime.setId(workTime.getId());
    teacherWorkTime.setTeacher(workTime.getTeacher());
    return teacherWorkTimeRepository.save(teacherWorkTime);
  }

  @Override
  public void delete(Long id) {
    TeacherWorkTime workTime = teacherWorkTimeRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Worktime", "id", id));
    Teacher teacher = teacherRepository.findById(workTime.getTeacher().getId()).orElseThrow(() -> new ResourceNotFoundException("Teacher", "id", id));
    Set<TeacherWorkTime> times = teacher.getWorkTimes().stream().filter(teacherWorkTime -> teacherWorkTime.getId() != workTime.getId()).collect(Collectors.toSet());
    teacher.setWorkTimes(times);
    teacherRepository.save(teacher);
    teacherWorkTimeRepository.delete(workTime);
  }
}
