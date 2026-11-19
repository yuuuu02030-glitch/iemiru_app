package com.iemiru.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@AllArgsConstructor
public class CustomerDetailResponse {

    private Integer customerId;

    private String name;

    private String address;

    private String phone;

    private String buildType;

    private String buildTiming;

    private String buildArea;

    private String visitReason;

    private LocalDateTime visitDatetime;

    private List<VisitRecordItem> records;
}
