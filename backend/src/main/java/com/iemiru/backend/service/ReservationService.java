package com.iemiru.backend.service;

import com.iemiru.backend.dto.ReservationRequest;
import com.iemiru.backend.dto.ReservationResponse;
import com.iemiru.backend.entity.Customer;
import com.iemiru.backend.entity.House;
import com.iemiru.backend.entity.Reservation;
import com.iemiru.backend.entity.VisitRecord;
import com.iemiru.backend.repository.*;
import com.iemiru.backend.repository.HouseRepository;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.ThreadLocalRandom;

@Service
public class ReservationService {

    private final CustomerRepository customerRepository;
    private final HouseRepository houseRepository;
    private final ReservationRepository reservationRepository;
    private final VisitRecordRepository visitRecordRepository;

    public ReservationService(CustomerRepository customerRepository,
                              HouseRepository houseRepository,
                              ReservationRepository reservationRepository,
                              VisitRecordRepository visitRecordRepository) {

        this.customerRepository = customerRepository;
        this.houseRepository = houseRepository;
        this.reservationRepository = reservationRepository;
        this.visitRecordRepository = visitRecordRepository;
    }

    @Transactional
    public ReservationResponse create(ReservationRequest request) {

        Customer customer = new Customer();
        customer.setName(request.getName());
        customer.setAddress(request.getAddress());
        customer.setPhone(request.getPhone());
        customer.setBuildType(request.getBuildType());
        customer.setBuildTiming(request.getBuildTiming());
        customer.setBuildArea(request.getBuildArea());
        customer.setVisitReason(request.getVisitReason());
        Customer savedCustomer = customerRepository.save(customer);

        String receptionNo = createReceptionNo(request.getVisitDatetime());

        Reservation reservation = new Reservation();
        reservation.setReceptionNo(receptionNo);
        reservation.setCustomerId(savedCustomer.getCustomerId());
        reservation.setVisitDatetime(request.getVisitDatetime());
        Reservation saveReservation = reservationRepository.save(reservation);

        List<VisitRecord> records = new ArrayList<>();
        for (House house : houseRepository.findAll()) {
            VisitRecord record = new VisitRecord();
            record.setReservationId(saveReservation.getReservationId());
            record.setHouseId(house.getHouseId());
            record.setWish(request.getHouseIds().contains(house.getHouseId()));
            records.add(record);
        }
        visitRecordRepository.saveAll(records);

        return new ReservationResponse(receptionNo,
                saveReservation.getVisitDatetime());
    }

    private String createReceptionNo (LocalDateTime visitDatetime) {
        String monthDay = visitDatetime.format(DateTimeFormatter.ofPattern("MMdd"));
        String receptionNo;

        do {
            int random = ThreadLocalRandom.current().nextInt(1000);
            receptionNo = monthDay + "-" + String.format("%03d", random);
        } while (reservationRepository.existsByReceptionNo(receptionNo));
            return receptionNo;
    }

}
