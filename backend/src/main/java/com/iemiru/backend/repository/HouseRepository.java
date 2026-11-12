package com.iemiru.backend.repository;

import com.iemiru.backend.entity.House;
import org.springframework.data.jpa.repository.JpaRepository;

public interface HouseRepository extends JpaRepository<House, Integer> {
}
