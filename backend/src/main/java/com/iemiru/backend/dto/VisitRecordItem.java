package com.iemiru.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class VisitRecordItem {

    private Integer houseId;

    private String companyName;

    private String houseName;

    private Boolean wish;

    private Boolean visited;

    private Boolean favorite;
}
