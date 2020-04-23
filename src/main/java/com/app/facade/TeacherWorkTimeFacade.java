package com.app.facade;

import com.app.dto.request.TeacherWorkTimeRequest;
import com.app.dto.response.TeacherWorkTimeResponse;
import com.app.model.TeacherWorkTime;
import com.app.service.TeacherWorkTimeService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
@RequiredArgsConstructor
public class TeacherWorkTimeFacade {
  private final TeacherWorkTimeService teacherWorkTimeService;
  private final ModelMapper modelMapper;

  public List<TeacherWorkTimeResponse> getAllByTeacher(Long teacherId) {
    List<TeacherWorkTime> workTimeList = teacherWorkTimeService.getAllByTeacher(teacherId);
    List<TeacherWorkTimeResponse> response = workTimeList.stream().map(workTime -> modelMapper.map(workTime, TeacherWorkTimeResponse.class)).collect(Collectors.toList());
    return response;
  }

  public TeacherWorkTimeResponse updateTime(Long id, TeacherWorkTimeRequest request) {
    TeacherWorkTime teacherWorkTime = modelMapper.map(request, TeacherWorkTime.class);
    TeacherWorkTime updatedTime = teacherWorkTimeService.update(id, teacherWorkTime);
    return modelMapper.map(updatedTime, TeacherWorkTimeResponse.class);
  }

  public TeacherWorkTimeResponse createTime(Long teacherId, TeacherWorkTimeRequest request) {
    TeacherWorkTime teacherWorkTime = modelMapper.map(request, TeacherWorkTime.class);
    TeacherWorkTime createdTime = teacherWorkTimeService.create(teacherId, teacherWorkTime);
    return modelMapper.map(createdTime, TeacherWorkTimeResponse.class);
  }

  public void deleteTime(Long id) {
    teacherWorkTimeService.delete(id);
  }
}
