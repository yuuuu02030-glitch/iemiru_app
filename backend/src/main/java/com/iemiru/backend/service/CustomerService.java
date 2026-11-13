package com.iemiru.backend.service;

import com.iemiru.backend.dto.CustomerRequest;
import com.iemiru.backend.dto.CustomerResponse;
import com.iemiru.backend.dto.CustomerSummaryResponse;
import com.iemiru.backend.entity.Customer;
import com.iemiru.backend.exception.NotFoundException;
import com.iemiru.backend.repository.CustomerRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class CustomerService {

    private final CustomerRepository customerRepository;

    public CustomerService(CustomerRepository customerRepository) {
        this.customerRepository = customerRepository;
    }

    @Transactional
    public CustomerResponse create(CustomerRequest request) {

        Customer customer = new Customer();
        customer.setName(request.getName());
        customer.setAddress(request.getAddress());
        customer.setPhone(request.getPhone());
        customer.setBuildType(request.getBuildType());
        customer.setBuildTiming(request.getBuildTiming());
        customer.setBuildArea(request.getBuildArea());
        customer.setVisitReason(request.getVisitReason());
        Customer saveCustomer = customerRepository.save(customer);

        return new CustomerResponse(saveCustomer.getCustomerId(),
                saveCustomer.getName(),
                saveCustomer.getAddress(),
                saveCustomer.getPhone());
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
