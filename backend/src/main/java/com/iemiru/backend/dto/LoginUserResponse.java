package com.iemiru.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class LoginUserResponse {

    private String loginId;

    private String role;
}
