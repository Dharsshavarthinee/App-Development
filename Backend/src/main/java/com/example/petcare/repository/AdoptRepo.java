package com.example.petcare.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.petcare.model.Adopt;

public interface AdoptRepo extends JpaRepository<Adopt,Long>{
    List<Adopt> findByEmail(String email);
    void deleteById(Long id);

}
