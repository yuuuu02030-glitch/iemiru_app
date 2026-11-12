package com.iemiru.backend.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Table(name = "customers")
@Getter
@Setter
public class Customer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer customerId;

    private String name;

    private String address;

    private String phone;

    private String buildType;

    private String buildTiming;

    private String buildArea;

    private String visitReason;

    @Column(insertable = false, updatable = false)
    private LocalDateTime createdAt;
}
