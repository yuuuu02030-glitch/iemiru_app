package com.iemiru.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class CustomerSummaryResponse {

    private String name;

    private String address;

    private String buildType;

    private String buildTiming;

    private String buildArea;

    private String visitReason;
}
