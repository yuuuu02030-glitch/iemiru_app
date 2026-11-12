package com.iemiru.backend.controller;

import com.iemiru.backend.entity.House;
import com.iemiru.backend.service.HouseService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class HouseController {

    private final HouseService houseService;

    public HouseController(HouseService houseService) {
        this.houseService = houseService;
    }

    @GetMapping("/houses")
    public List<House> findAll() {
        return houseService.findAll();
    }
}
