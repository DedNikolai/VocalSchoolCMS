package com.app.facade;

import com.app.dto.request.TeacherRequest;
import com.app.dto.response.TeacherResponse;
import com.app.model.Teacher;
import com.app.service.TeacherService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
@RequiredArgsConstructor
public class TeacherFacade {
  private final TeacherService teacherService;
  private final ModelMapper modelMapper;

  public TeacherResponse getTeacherById(Long id) {
    Teacher teacher = teacherService.getTeacherById(id);
    return modelMapper.map(teacher, TeacherResponse.class);
  }

  public List<TeacherResponse> getAllTeachers() {
    List<Teacher> teachers = teacherService.getAllTeachers();
    List<TeacherResponse> responseList = teachers.stream().map(teacher -> modelMapper.map(teacher, TeacherResponse.class)).collect(Collectors.toList());
    return responseList;
  }

  public TeacherResponse createTeacher(TeacherRequest teacherRequest) {
    Teacher teacher = modelMapper.map(teacherRequest, Teacher.class);
    Teacher createdTeaher = teacherService.createTeacher(teacher);
    return modelMapper.map(createdTeaher, TeacherResponse.class);
  }

  public TeacherResponse updateTeacher(Long id, TeacherRequest teacherRequest) {
    Teacher teacher = modelMapper.map(teacherRequest, Teacher.class);
    Teacher updatedTeacher = teacherService.updateTeacher(id, teacher);
    return modelMapper.map(updatedTeacher, TeacherResponse.class);
  }

  public void deleteTeacher(Long id) {
    teacherService.deleteTeacher(id);
  }
}
