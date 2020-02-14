package com.app.repository;

import com.app.model.Student;
import com.app.model.Teacher;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface StudentRepository extends JpaRepository<Student, Long> {
  List<Student> findAllByTeachersContains(Teacher teacher);
}
