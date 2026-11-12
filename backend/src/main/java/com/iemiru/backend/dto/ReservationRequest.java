package com.iemiru.backend.dto;

import jakarta.validation.constraints.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
public class ReservationRequest {

    @NotBlank(message = "氏名を入力してください")
    @Size(max = 30, message = "氏名は30文字以内で入力してください")
    private String name;

    @NotBlank(message = "住所を入力してください")
    @Size(max = 100, message = "住所は100文字以内で入力してください")
    private String address;

    @NotBlank(message = "電話番号を入力してください")
    @Pattern(regexp = "^[0-9]{10,11}$", message = "電話番号は半角数字10〜11桁で入力してください")
    private String phone;

    @NotBlank(message = "建築区分を選択してください")
    private String buildType;

    @NotBlank(message = "建築時期を選択してください")
    private String buildTiming;

    @Size(max = 50, message = "建築予定地は50文字以内で入力してください")
    private String buildArea;

    private String visitReason;

    @NotNull(message = "日付と時間を選択してください")
    private LocalDateTime visitDatetime;

    @NotEmpty(message = "見たい棟を選んでください")
    private List<Integer> houseIds;

}
