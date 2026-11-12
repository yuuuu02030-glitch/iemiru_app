package com.iemiru.backend.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "visit_records")
@Getter
@Setter
public class VisitRecord {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer visitRecordId;

    private Integer reservationId;

    private Integer houseId;

    private Boolean wish = false;

    private Boolean visited = false;

    private Boolean favorite = false;
}
