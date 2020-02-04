package com.app.repository;

import com.app.model.TransferLesson;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TransferLessonRepository extends JpaRepository<TransferLesson, Long> {
}
