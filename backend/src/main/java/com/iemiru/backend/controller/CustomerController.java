package com.iemiru.backend.controller;

import com.iemiru.backend.dto.*;
import com.iemiru.backend.service.CustomerService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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

    @PostMapping("/customers")
    public ResponseEntity<CustomerResponse> create(@Valid @RequestBody CustomerRequest request) {
        CustomerResponse response = customerService.create(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @GetMapping("/customers")
    public ResponseEntity<List<CustomerResponse>> findAll() {
        return ResponseEntity.ok(customerService.findAll());
    }

    @GetMapping("/customers/{id}")
    public ResponseEntity<CustomerDetailResponse> findDetail(@PathVariable Integer id) {
        return ResponseEntity.ok(customerService.findDetail(id));
    }

    @PutMapping("/customers/{id}")
    public ResponseEntity<CustomerResponse> update(@PathVariable Integer id,
                                                   @Valid @RequestBody CustomerRequest request) {
        CustomerResponse response = customerService.update(id, request);
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/customers/{id}")
    public ResponseEntity<MessageResponse> delete(@PathVariable Integer id) {
        return ResponseEntity.ok(customerService.delete(id));

    }
}
