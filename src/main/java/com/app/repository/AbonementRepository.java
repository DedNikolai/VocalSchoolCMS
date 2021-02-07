package com.app.repository;

import com.app.model.Abonement;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AbonementRepository extends JpaRepository<Abonement, Long> {
  Page<Abonement> findAllByOrderByCreatedDateDesc(Pageable pageable);
}
