package com.iemiru.backend.exception;

import lombok.Getter;

@Getter
public class BusinessException extends RuntimeException {

    private final String field;

    public BusinessException(String field, String message) {
        super(message);
        this.field = field;
    }
}
