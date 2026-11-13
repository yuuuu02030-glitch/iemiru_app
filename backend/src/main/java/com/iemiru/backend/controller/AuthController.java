package com.iemiru.backend.controller;

import com.iemiru.backend.dto.LoginRequest;
import com.iemiru.backend.dto.LoginUserResponse;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.context.HttpSessionSecurityContextRepository;
import org.springframework.security.web.context.SecurityContextRepository;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AuthController {

    private final AuthenticationManager authenticationManager;

    private final SecurityContextRepository securityContextRepository =
            new HttpSessionSecurityContextRepository();

    public AuthController(AuthenticationManager authenticationManager) {
        this.authenticationManager = authenticationManager;
    }

    @PostMapping("/login")
    public ResponseEntity<LoginUserResponse> login(@Valid @RequestBody LoginRequest request,
                                                   HttpServletRequest httpRequest,
                                                   HttpServletResponse httpResponse) {

        Authentication authentication = authenticationManager.authenticate(
                UsernamePasswordAuthenticationToken.unauthenticated(request.getLoginId(), request.getPassword()));

        SecurityContext context = SecurityContextHolder.createEmptyContext();
        context.setAuthentication(authentication);
        SecurityContextHolder.setContext(context);
        securityContextRepository.saveContext(context, httpRequest, httpResponse);

        String role = authentication.getAuthorities().iterator().next().getAuthority();
        return ResponseEntity.ok(new LoginUserResponse(authentication.getName(), role));
    }

    @GetMapping("/me")
    public ResponseEntity<LoginUserResponse> me(Authentication authentication) {
        String role = authentication.getAuthorities().iterator().next().getAuthority();
        return ResponseEntity.ok(new LoginUserResponse(authentication.getName(), role));
    }
}
