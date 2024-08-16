package com.example.petcare.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.petcare.model.Register;

public interface RegisterRepo extends JpaRepository<Register, Long> {
     Register findByEmailId(String emailId);
}
