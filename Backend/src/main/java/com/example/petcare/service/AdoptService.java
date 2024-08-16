package com.example.petcare.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.petcare.model.Adopt;
import com.example.petcare.repository.AdoptRepo;

@Service
public class AdoptService {
    
    @Autowired 
    AdoptRepo adoptR;

    public Adopt addDetails(Adopt a)
    {
        return adoptR.save(a);
    }

    public List<Adopt> getAllAdoptions() {
        return adoptR.findAll();
    }
    

    public Adopt updateAdoptionStatus(Long id, String status) {
        Optional<Adopt> optionalAdopt = adoptR.findById(id);
        if (optionalAdopt.isPresent()) {
            Adopt adopt = optionalAdopt.get();
            adopt.setStatus(status);
            return adoptR.save(adopt);
        } else {
            throw new RuntimeException("Adoption not found");
        }
    }

    public List<Adopt> getAdoptionsByEmail(String email) {
        return adoptR.findByEmail(email);
    }

    public void deleteAdoption(Long id) {
        Optional<Adopt> optionalAdopt = adoptR.findById(id);
        if (optionalAdopt.isPresent()) {
            adoptR.deleteById(id);
        } else {
            throw new RuntimeException("Adoption not found");
        }
    }
    
}
