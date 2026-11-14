package com.iemiru.backend.repository;

import com.iemiru.backend.entity.Customer;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CustomerRepository extends JpaRepository<Customer, Integer> {

    List<Customer> findByOrderByCreatedAtDesc();

}
