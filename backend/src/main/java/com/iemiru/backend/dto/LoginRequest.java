package com.iemiru.backend.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class LoginRequest {

    @NotBlank(message = "ログインIDとパスワードを入力してください")
    private String loginId;

    @NotBlank(message = "ログインIDとパスワードを入力してください")
    private String password;
}
