package com.iemiru.backend.controller;

import com.iemiru.backend.dto.CustomerSummaryResponse;
import com.iemiru.backend.service.CustomerService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class CustomerController {

    private final CustomerService customerService;

    public CustomerController(CustomerService customerService) {
        this.customerService = customerService;
    }

    @GetMapping("/customers/{id}/summary")
    public ResponseEntity<CustomerSummaryResponse> findSummary(@PathVariable Integer id) {
        return ResponseEntity.ok(customerService.findSummary(id));
    }


}
