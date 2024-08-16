package com.example.petcare.controller;

import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.bind.annotation.RequestPart;

import com.example.petcare.model.Rescue;
import com.example.petcare.service.RescueService;

@RestController
@RequestMapping("/api")
public class RescueController {

    @Autowired 
    RescueService rescueSer;

    @PostMapping("/Rescue")
    public Rescue addDetails(@RequestPart("name") String name,
                             @RequestPart("phoneNo") String phoneNo,
                             @RequestPart("emailId") String emailId,
                             @RequestPart("location") String location,
                             @RequestPart("description") String description,
                             @RequestPart("image") MultipartFile image) throws IOException {
        Rescue r = new Rescue();
        r.setName(name);
        r.setPhoneNo(phoneNo);
        r.setEmailId(emailId);
        r.setLocation(location);
        r.setDescription(description);
        return rescueSer.addDetails(r, image);
    }

    @GetMapping("/Rescue")
    public List<Rescue> getAllRescues() {
        return rescueSer.getAllRescues();
    }
}
