package com.example.petcare.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.petcare.model.Transfer;
import com.example.petcare.repository.TransferRepo;


import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@Service
public class TransferService {

    @Autowired
    private TransferRepo tRepo;

    public Transfer saveTransfer(String ownerName, String ownerPhone, String ownerEmail, String petName, String petBreed, int petAge, String description, MultipartFile imageFile) throws IOException {
        Transfer transfer = new Transfer();
        transfer.setOwnerName(ownerName);
        transfer.setOwnerPhone(ownerPhone);
        transfer.setOwnerEmail(ownerEmail);
        transfer.setPetName(petName);
        transfer.setPetBreed(petBreed);
        transfer.setPetAge(petAge);
        transfer.setDescription(description);

        if (imageFile != null && !imageFile.isEmpty()) {
            transfer.setImage(imageFile.getBytes());
        }

        return tRepo.save(transfer);
    }

    public List<Transfer> getAllTransfers() {
        return tRepo.findAll();
    }
    
}

