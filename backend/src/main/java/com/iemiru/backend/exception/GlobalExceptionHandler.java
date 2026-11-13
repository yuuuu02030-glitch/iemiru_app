package com.iemiru.backend.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.LinkedHashMap;
import java.util.Map;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Map<String, Object>>
    handleValidation(MethodArgumentNotValidException ex) {

        Map<String, String> errors = new LinkedHashMap<>();
        for(FieldError error : ex.getBindingResult().getFieldErrors()) {
            errors.put(error.getField(), error.getDefaultMessage());
        }

        Map<String, Object> body = new LinkedHashMap<>();
        body.put("message", "入力内容に誤りがあります");
        body.put("errors", errors);

        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(body);
    }

    @ExceptionHandler(BusinessException.class)
    public ResponseEntity<Map<String, Object>> handleBusiness(BusinessException ex) {

        Map<String, String> errors = new LinkedHashMap<>();
        errors.put(ex.getField(), ex.getMessage());   // 項目名とエラー文を、ex から取り出す

        Map<String, Object> body = new LinkedHashMap<>();
        body.put("message", "入力内容に誤りがあります");
        body.put("errors", errors);

        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(body);
    }

    @ExceptionHandler(NotFoundException.class)
    public ResponseEntity<Map<String, Object>> handleNotFound(NotFoundException ex) {

        Map<String, Object> body = new LinkedHashMap<>();
        body.put("message", ex.getMessage());

        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(body);
    }

    @ExceptionHandler(BadCredentialsException.class)
    public ResponseEntity<Map<String, Object>> handleBadCredentials(BadCredentialsException ex) {
        Map<String, Object> body = new LinkedHashMap<>();
        body.put("message", "ログインIDまたはパスワードが正しくありません");
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(body);
    }
}
