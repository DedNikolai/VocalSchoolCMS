package com.app.repository;

import com.app.model.Teacher;
import com.app.model.TeacherWorkTime;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TeacherWorkTimeRepository extends JpaRepository<TeacherWorkTime, Long> {
  List<TeacherWorkTime> findAllByTeacher(Teacher teacher);
}
