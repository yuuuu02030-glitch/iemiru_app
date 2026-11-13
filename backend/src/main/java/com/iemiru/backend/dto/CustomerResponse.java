package com.iemiru.backend.dto;


import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class CustomerResponse {

    private Integer customerId;

    private String name;

    private  String address;

    private String phone;
}
