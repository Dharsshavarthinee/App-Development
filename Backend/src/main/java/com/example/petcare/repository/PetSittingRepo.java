package com.example.petcare.repository;
import org.springframework.data.jpa.repository.JpaRepository;
import com.example.petcare.model.PetSitting;

public interface PetSittingRepo extends JpaRepository<PetSitting,Long>{
    
}
