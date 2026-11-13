package com.iemiru.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@AllArgsConstructor
public class ReservationListItem {

    private Integer reservationId;

    private Integer customerId;

    private LocalDateTime visitDatetime;

    private String name;
}
