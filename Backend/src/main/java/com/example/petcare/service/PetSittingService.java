package com.example.petcare.service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.petcare.model.PetSitting;
import com.example.petcare.repository.PetSittingRepo;

@Service
public class PetSittingService {

    @Autowired
    PetSittingRepo sittingRepo;

    public PetSitting addDetails(PetSitting p) {
      return sittingRepo.save(p);
    }

}
