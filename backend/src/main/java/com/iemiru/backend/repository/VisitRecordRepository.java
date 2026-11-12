package com.iemiru.backend.repository;

import com.iemiru.backend.entity.VisitRecord;
import org.springframework.data.jpa.repository.JpaRepository;

public interface VisitRecordRepository extends JpaRepository<VisitRecord, Integer> {
}
