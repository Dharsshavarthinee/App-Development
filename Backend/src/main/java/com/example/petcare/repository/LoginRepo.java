package com.example.petcare.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.petcare.model.Login;

public interface LoginRepo extends JpaRepository<Login, Long> {
   
}
