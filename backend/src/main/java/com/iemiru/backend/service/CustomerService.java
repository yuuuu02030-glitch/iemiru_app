package com.iemiru.backend.service;

import com.iemiru.backend.dto.CustomerSummaryResponse;
import com.iemiru.backend.entity.Customer;
import com.iemiru.backend.exception.NotFoundException;
import com.iemiru.backend.repository.CustomerRepository;
import org.springframework.stereotype.Service;

@Service
public class CustomerService {

    private final CustomerRepository customerRepository;

    public CustomerService(CustomerRepository customerRepository) {
        this.customerRepository = customerRepository;
    }

    public CustomerSummaryResponse findSummary(Integer id) {

        Customer customer = customerRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("お客様の情報が見つかりません"));

        return new CustomerSummaryResponse(
                customer.getName(),
                customer.getAddress(),
                customer.getBuildType(),
                customer.getBuildTiming(),
                customer.getBuildArea(),
                customer.getVisitReason()
        );

    }
}
