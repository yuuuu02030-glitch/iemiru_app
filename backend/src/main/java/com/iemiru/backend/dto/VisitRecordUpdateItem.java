package com.iemiru.backend.dto;

import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class VisitRecordUpdateItem {

    @NotNull(message = "住宅情報が正しく取得できません")
    private Integer houseId;

    @NotNull(message = "見学記録の形式が正しくありません")
    private Boolean visited;

    @NotNull(message = "見学記録の形式が正しくありません")
    private Boolean favorite;
}
