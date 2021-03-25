package com.app.repository;

import com.app.model.Abonement;
import com.app.model.ConfirmedLesson;
import com.app.model.DeletedLesson;
import com.app.model.Discipline;
import com.app.model.Student;
import com.app.model.TransferLesson;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AbonementRepository extends JpaRepository<Abonement, Long> {
  Page<Abonement> findAllByOrderByCreatedDateDesc(Pageable pageable);

  @Query("select a from Abonement a where a.student = :student and a.discipline = :discipline " +
      "and a.usedQuantity < a.quantity order by a.createdDate")
  Abonement findFirstByStudentAndDisciplineOrderByCreatedDate(
      @Param("student") Student student, @Param("discipline") Discipline discipline);

  Abonement findFirstByConfirmedLessonsContains(ConfirmedLesson confirmedLesson);

//  Abonement findFirstByTransferLessonsContains(TransferLesson transferLesson);

  Abonement findFirstByDeletedLessonsContains(DeletedLesson deletedLesson);

  @Query("select a from Abonement a where a.student = :student " +
      "and a.usedQuantity < a.quantity order by a.createdDate")
  List<Abonement> findAllByStudent(@Param("student") Student student);

}
