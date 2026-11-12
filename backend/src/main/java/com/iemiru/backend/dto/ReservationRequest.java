package com.iemiru.backend.dto;

import jakarta.validation.constraints.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
public class ReservationRequest {

    @NotBlank
    @Size(max = 30)
    private String name;

    @NotBlank
    @Size(max = 100)
    private String address;

    @NotBlank
    @Pattern(regexp = "^[0-9]{10,11}$")
    private String phone;

    @NotBlank
    private String buildType;

    @NotBlank
    private String buildTiming;

    @Size(max = 50)
    private String buildArea;

    private String visitReason;

    @NotNull
    private LocalDateTime visitDatetime;

    @NotEmpty
    private List<Integer> houseIds;

}
