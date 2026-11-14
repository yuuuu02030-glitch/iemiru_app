package com.iemiru.backend.repository;

import com.iemiru.backend.entity.Reservation;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public interface ReservationRepository extends JpaRepository<Reservation, Integer> {

    boolean existsByReceptionNo(String receptionNo);

    Optional<Reservation> findByReceptionNo(String receptionNo);

    List<Reservation> findByVisitDatetimeBetweenOrderByVisitDatetimeAsc(LocalDateTime start, LocalDateTime end);

    Optional<Reservation> findFirstByCustomerIdOrderByVisitDatetimeDesc(Integer customerId);

}
