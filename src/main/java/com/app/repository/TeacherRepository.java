package com.app.repository;

import com.app.model.Lesson;
import com.app.model.Student;
import com.app.model.Teacher;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TeacherRepository extends JpaRepository<Teacher, Long> {
  List<Teacher> findAllByStudentsContains(Student student);
  Teacher findByLessonsContains(Lesson lesson);
}
