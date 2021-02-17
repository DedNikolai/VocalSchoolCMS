package com.app.repository;

import com.app.model.Abonement;
import com.app.model.ConfirmedLesson;
import com.app.model.Student;
import com.app.model.TransferLesson;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AbonementRepository extends JpaRepository<Abonement, Long> {
  Page<Abonement> findAllByOrderByCreatedDateDesc(Pageable pageable);

  Abonement findFirstByStudentAndIsActiveTrueOrderByCreatedDate(Student student);

  Abonement findFirstByConfirmedLessonsContains(ConfirmedLesson confirmedLesson);

  Abonement findFirstByTransferLessonsContains(TransferLesson transferLesson);

}
