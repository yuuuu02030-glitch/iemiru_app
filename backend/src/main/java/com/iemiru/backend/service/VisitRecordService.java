package com.iemiru.backend.service;

import com.iemiru.backend.dto.*;
import com.iemiru.backend.entity.Customer;
import com.iemiru.backend.entity.House;
import com.iemiru.backend.entity.Reservation;
import com.iemiru.backend.entity.VisitRecord;
import com.iemiru.backend.exception.BusinessException;
import com.iemiru.backend.exception.NotFoundException;
import com.iemiru.backend.repository.CustomerRepository;
import com.iemiru.backend.repository.HouseRepository;
import com.iemiru.backend.repository.ReservationRepository;
import com.iemiru.backend.repository.VisitRecordRepository;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

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

        Reservation reservation = findVerifiedReservation(request.getReceptionNo(), request.getPhone());

        Customer customer = customerRepository.findById(reservation.getCustomerId()).orElseThrow();

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

    private Reservation findVerifiedReservation(String receptionNo, String phone) {

        String errorMessage = "受付番号または電話番号が正しくありません";

        Reservation reservation = reservationRepository.findByReceptionNo(receptionNo)
                .orElseThrow(() -> new NotFoundException(errorMessage));

        Customer customer = customerRepository.findById(reservation.getCustomerId())
                .orElseThrow(() -> new NotFoundException(errorMessage));

        if (!customer.getPhone().equals(phone)) {
            throw new NotFoundException(errorMessage);
        }
        return reservation;
    }

    @Transactional
    public MessageResponse update(VisitRecordUpdateRequest request) {

        Reservation reservation = findVerifiedReservation(request.getReceptionNo(), request.getPhone());

        Map<Integer, VisitRecordUpdateItem> itemMap = new HashMap<>();
        for (VisitRecordUpdateItem item : request.getRecords()) {
            itemMap.put(item.getHouseId(), item);
        }

        List<VisitRecord> records = visitRecordRepository.findByReservationIdOrderByHouseIdAsc(reservation.getReservationId());

        for (VisitRecord record : records) {

            VisitRecordUpdateItem item = itemMap.get(record.getHouseId());
            if (item == null) {
                continue;
            }

            if (item.getFavorite() && !item.getVisited()) {
                throw new BusinessException("records", "「気に入った」は「見た」棟だけ選択できます");
            }

            record.setVisited(item.getVisited());
            record.setFavorite(item.getFavorite());
        }

        visitRecordRepository.saveAll(records);

        return new MessageResponse("登録しました");
    }
}
