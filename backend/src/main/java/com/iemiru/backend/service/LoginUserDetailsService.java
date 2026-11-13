package com.iemiru.backend.service;

import com.iemiru.backend.entity.Login;
import com.iemiru.backend.repository.LoginRepository;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class LoginUserDetailsService implements UserDetailsService {

    private final LoginRepository loginRepository;

    public LoginUserDetailsService (LoginRepository loginRepository) {
        this.loginRepository = loginRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String loginId) throws UsernameNotFoundException {

        Login login = loginRepository.findById(loginId)
                .orElseThrow(() -> new UsernameNotFoundException("Not Found"));

        return User.withUsername(login.getLoginId())
                .password(login.getPassword())
                .authorities(login.getRole())
                .build();
    }

}
