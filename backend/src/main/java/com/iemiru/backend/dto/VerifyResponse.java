package com.iemiru.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.List;

@Getter
@AllArgsConstructor
public class VerifyResponse {
    private String name;
    private List<VisitRecordItem> records;
}
