package com.iemiru.backend.service;

import com.iemiru.backend.dto.VerifyRequest;
import com.iemiru.backend.dto.VerifyResponse;
import com.iemiru.backend.dto.VisitRecordItem;
import com.iemiru.backend.entity.Customer;
import com.iemiru.backend.entity.House;
import com.iemiru.backend.entity.Reservation;
import com.iemiru.backend.entity.VisitRecord;
import com.iemiru.backend.exception.NotFoundException;
import com.iemiru.backend.repository.CustomerRepository;
import com.iemiru.backend.repository.HouseRepository;
import com.iemiru.backend.repository.ReservationRepository;
import com.iemiru.backend.repository.VisitRecordRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class VisitRecordService {

    private final CustomerRepository customerRepository;
    private final HouseRepository houseRepository;
    private final ReservationRepository reservationRepository;
    private final VisitRecordRepository visitRecordRepository;

    public VisitRecordService(CustomerRepository customerRepository,
                              HouseRepository houseRepository,
                              ReservationRepository reservationRepository,
                              VisitRecordRepository visitRecordRepository) {

        this.customerRepository = customerRepository;
        this.houseRepository = houseRepository;
        this.reservationRepository = reservationRepository;
        this.visitRecordRepository = visitRecordRepository;
    }

    public VerifyResponse verify(VerifyRequest request) {

        String errorMessage = "受付番号または電話番号が正しくありません";

        Reservation reservation = reservationRepository.findByReceptionNo(request.getReceptionNo())
                .orElseThrow(() -> new NotFoundException(errorMessage));

        Customer customer = customerRepository.findById(reservation.getCustomerId())
                .orElseThrow(() -> new NotFoundException(errorMessage));

        if (!customer.getPhone().equals(request.getPhone())) {
            throw new NotFoundException(errorMessage);
        }
        List<VisitRecord> records = visitRecordRepository.findByReservationIdOrderByHouseIdAsc(reservation.getReservationId());

        List<VisitRecordItem> items = new ArrayList<>();
        for (VisitRecord record : records) {
            House house = houseRepository.findById(record.getHouseId()).orElseThrow();
            items.add(new VisitRecordItem(
                    record.getHouseId(),
                    house.getCompanyName(),
                    house.getHouseName(),
                    record.getWish(),
                    record.getVisited(),
                    record.getFavorite()
            ));
        }

        return new VerifyResponse(customer.getName(), items);
    }
}
