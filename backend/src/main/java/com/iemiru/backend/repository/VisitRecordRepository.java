package com.iemiru.backend.repository;

import com.iemiru.backend.entity.VisitRecord;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface VisitRecordRepository extends JpaRepository<VisitRecord, Integer> {

    List<VisitRecord> findByReservationIdOrderByHouseIdAsc(Integer reservationId);

}
