package com.iemiru.backend.service;

import com.iemiru.backend.dto.*;
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
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Service
public class CustomerService {

    private final CustomerRepository customerRepository;
    private final ReservationRepository reservationRepository;
    private final VisitRecordRepository visitRecordRepository;
    private final HouseRepository houseRepository;

    public CustomerService(CustomerRepository customerRepository,
                           ReservationRepository reservationRepository,
                           VisitRecordRepository visitRecordRepository,
                           HouseRepository houseRepository) {
        this.customerRepository = customerRepository;
        this.reservationRepository = reservationRepository;
        this.visitRecordRepository = visitRecordRepository;
        this.houseRepository = houseRepository;
    }

    @Transactional
    public CustomerResponse create(CustomerRequest request) {

        Customer customer = new Customer();
        customer.setName(request.getName());
        customer.setAddress(request.getAddress());
        customer.setPhone(request.getPhone());
        customer.setBuildType(request.getBuildType());
        customer.setBuildTiming(request.getBuildTiming());
        customer.setBuildArea(request.getBuildArea());
        customer.setVisitReason(request.getVisitReason());
        Customer saveCustomer = customerRepository.save(customer);

        return new CustomerResponse(saveCustomer.getCustomerId(),
                saveCustomer.getName(),
                saveCustomer.getAddress(),
                saveCustomer.getPhone());
    }

    private static final Pattern AREA_PATTERN = Pattern.compile("^.{2,}?[市区町村]");

    private String toArea(String address) {
        Matcher matcher = AREA_PATTERN.matcher(address);

        if(matcher.find()) {
            return matcher.group();
        }
        return address;
    }

    public CustomerSummaryResponse findSummary(Integer id) {

        Customer customer = customerRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("お客様の情報が見つかりません"));

        return new CustomerSummaryResponse(
                customer.getName(),
                toArea(customer.getAddress()),
                customer.getBuildType(),
                customer.getBuildTiming(),
                customer.getBuildArea(),
                customer.getVisitReason()
        );
    }

    public List<CustomerResponse> findAll() {
        List<CustomerResponse> items = new ArrayList<>();
        for (Customer customer : customerRepository.findByOrderByCreatedAtDesc()) {
            items.add(new CustomerResponse(customer.getCustomerId(), customer.getName(), customer.getAddress(), customer.getPhone()));
        }
        return items;
    }

    public CustomerDetailResponse findDetail(Integer id) {

        Customer customer = customerRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("お客様の情報が見つかりません"));

        LocalDateTime visitDatetime = null;
        List<VisitRecordItem> items = new ArrayList<>();

        Optional<Reservation> reservation = reservationRepository.findFirstByCustomerIdOrderByVisitDatetimeDesc(customer.getCustomerId());
        if (reservation.isPresent()) {
            Reservation r = reservation.get();
            visitDatetime = r.getVisitDatetime();

            List<VisitRecord> records = visitRecordRepository.findByReservationIdOrderByHouseIdAsc(r.getReservationId());
            for (VisitRecord record : records)  {
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
        }

        return new CustomerDetailResponse(customer.getCustomerId(),
                customer.getName(),
                customer.getAddress(),
                customer.getPhone(),
                customer.getBuildType(),
                customer.getBuildTiming(),
                customer.getBuildArea(),
                customer.getVisitReason(),
                visitDatetime,
                items);
    }

    public CustomerResponse update(Integer id, CustomerRequest request) {

        Customer customer = customerRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("お客様の情報が見つかりません"));;

        customer.setName(request.getName());
        customer.setAddress(request.getAddress());
        customer.setPhone(request.getPhone());
        customer.setBuildType(request.getBuildType());
        customer.setBuildTiming(request.getBuildTiming());
        customer.setBuildArea(request.getBuildArea());
        customer.setVisitReason(request.getVisitReason());
        Customer saveCustomer = customerRepository.save(customer);

        return new CustomerResponse(saveCustomer.getCustomerId(),
                saveCustomer.getName(),
                saveCustomer.getAddress(),
                saveCustomer.getPhone());
    }

    public MessageResponse delete(Integer id) {

        Customer customer = customerRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("お客様の情報が見つかりません"));;

        customerRepository.delete(customer);

        return new MessageResponse("顧客情報を削除しました");
    }


}
