package com.app.repository;

import com.app.model.Credit;
import com.app.model.Student;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CreditRepository extends JpaRepository<Credit, Long> {
  List<Credit> findAllByStudent(Student student);

  Page<Credit> findAllByOrderByCreatedDateDesc(Pageable pageable);
}
