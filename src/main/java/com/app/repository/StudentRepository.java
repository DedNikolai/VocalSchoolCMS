package com.app.repository;

import com.app.model.Lesson;
import com.app.model.Student;
import com.app.model.Teacher;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface StudentRepository extends JpaRepository<Student, Long> {
  List<Student> findAllByTeachersContains(Teacher teacher);

  @Query("select s from Student s where "
      + "(:param is null or lower(s.firstName) like lower(CONCAT('%', :param, '%'))) or "
      + "(:param is null or lower(s.lastName) like lower(CONCAT('%', :param, '%')))")
  Page<Student> findAllByParams(@Param("param") String param, Pageable pageable);

  Student findByLessonsContains(Lesson lessons);
}
