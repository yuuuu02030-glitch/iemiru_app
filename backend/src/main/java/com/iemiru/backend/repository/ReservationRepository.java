package com.iemiru.backend.repository;

import com.iemiru.backend.entity.Reservation;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReservationRepository extends JpaRepository<Reservation, Integer> {

    boolean existsByReceptionNo(String receptionNo);

}
