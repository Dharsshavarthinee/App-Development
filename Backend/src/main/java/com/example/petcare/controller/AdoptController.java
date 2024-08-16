package com.example.petcare.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.petcare.model.Adopt;

import com.example.petcare.service.AdoptService;

@RestController
public class AdoptController {

    @Autowired
    AdoptService adoptSer;

    @PostMapping("/api/Adopt")
    public Adopt addDetails(@RequestBody Adopt a) {
        return adoptSer.addDetails(a);
    }

    @GetMapping("/Adopt")
    public ResponseEntity<List<Adopt>> getAllAdoptions() 
    {
        List<Adopt> adoptions = adoptSer.getAllAdoptions();
        if (adoptions.isEmpty()) 
        {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(adoptions);
    }


    @PutMapping("/Adopt/{id}/status")
    public Adopt updateAdoptionStatus(@PathVariable Long id, @RequestParam String status) {
        return adoptSer.updateAdoptionStatus(id, status);
    }

    @GetMapping("/Adopt/user")
    public ResponseEntity<List<Adopt>> getAdoptionsByUserEmail(@RequestParam String email) {
        List<Adopt> adoptions = adoptSer.getAdoptionsByEmail(email);
        if (adoptions.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(adoptions);
    }

    @DeleteMapping("/Adopt/{id}")
    public ResponseEntity<Void> deleteAdoption(@PathVariable Long id) {
    try {
        adoptSer.deleteAdoption(id);
        return ResponseEntity.noContent().build();
    } catch (RuntimeException e) {
        return ResponseEntity.notFound().build();
    }
}

}

