package com.iemiru.backend.repository;

import com.iemiru.backend.entity.Login;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LoginRepository extends JpaRepository<Login, String> {
}
