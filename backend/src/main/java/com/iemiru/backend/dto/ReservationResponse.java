package com.iemiru.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@AllArgsConstructor
public class ReservationResponse {

    private String receptionNo;

    private LocalDateTime visitDatetime;

}
