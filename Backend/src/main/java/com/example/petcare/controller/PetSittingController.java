package com.example.petcare.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import com.example.petcare.model.PetSitting;
import com.example.petcare.service.PetSittingService;

@RestController
public class PetSittingController {
      
    @Autowired 
    PetSittingService petService;
    @PostMapping("/api/pet-sitting")
        public PetSitting addDetails(@RequestBody PetSitting p)
        {
            return petService.addDetails(p);
        }

}
