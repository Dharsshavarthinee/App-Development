package com.example.petcare.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.petcare.model.Rescue;
public interface RescueRepo extends JpaRepository<Rescue, Long> {
    
}
