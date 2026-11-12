package com.iemiru.backend.controller;

import com.iemiru.backend.dto.VerifyRequest;
import com.iemiru.backend.dto.VerifyResponse;
import com.iemiru.backend.service.VisitRecordService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class VisitRecordController {

    private final VisitRecordService visitRecordService;

    public VisitRecordController(VisitRecordService visitRecordService) {
        this.visitRecordService = visitRecordService;
    }

    @PostMapping("/visit-records/verify")
    public ResponseEntity<VerifyResponse> verify(@Valid @RequestBody VerifyRequest request) {
        VerifyResponse response = visitRecordService.verify(request);
        return ResponseEntity.ok(response);
    }
}

