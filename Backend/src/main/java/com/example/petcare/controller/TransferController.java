package com.example.petcare.controller;

import org.springframework.beans.factory.annotation.Autowired;

import com.example.petcare.model.Transfer;
import com.example.petcare.service.TransferService;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/Ownership-Transfer")
public class TransferController {

    @Autowired
    private TransferService transferService;

    @PostMapping
    public ResponseEntity<String> createTransfer(
            @RequestParam("name") String ownerName,
            @RequestParam("phoneNo") String ownerPhone,
            @RequestParam("emailId") String ownerEmail,
            @RequestParam("petName") String petName,
            @RequestParam("petBreed") String petBreed,
            @RequestParam("petAge") int petAge,
            @RequestParam("description") String description,
            @RequestParam(value = "image", required = false) MultipartFile imageFile
    ) {
        try {
            transferService.saveTransfer(ownerName, ownerPhone, ownerEmail, petName, petBreed, petAge, description, imageFile);
            return new ResponseEntity<>("Transfer details submitted successfully!", HttpStatus.OK);
        } catch (IOException e) {
            return new ResponseEntity<>("Failed to process the image.", HttpStatus.BAD_REQUEST);
        } catch (Exception e) {
            return new ResponseEntity<>("An error occurred while submitting the transfer details.", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/All")
    public List<Transfer> getAllTransfers() {
        return transferService.getAllTransfers();
    }
}

