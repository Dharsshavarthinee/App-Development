package com.example.petcare.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.petcare.model.Transfer;

public interface TransferRepo extends JpaRepository<Transfer,Long>{
    
}
