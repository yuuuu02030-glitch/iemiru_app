package com.iemiru.backend.dto;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Pattern;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class VisitRecordUpdateRequest {

    @NotBlank(message = "受付番号を入力してください")
    @Pattern(regexp = "^[0-9]{4}-[0-9]{3}$", message = "受付番号は『1234-567』の形で入力してください")
    private String receptionNo;

    @NotBlank(message = "電話番号を入力してください")
    @Pattern(regexp = "^[0-9]{10,11}$", message = "電話番号は半角数字10〜11桁で入力してください")
    private String phone;

    @NotEmpty(message = "住宅情報が正しく取得できません")
    @Valid
    private List<VisitRecordUpdateItem> records;
}
