package com.example.petcare.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.List;

import com.example.petcare.model.Rescue;
import com.example.petcare.repository.RescueRepo;

@Service
public class RescueService {

    @Autowired
    RescueRepo rescueRep;

    @Autowired
    private JavaMailSender mailSender;

    public Rescue addDetails(Rescue r, MultipartFile image) throws IOException {
        if (image != null && !image.isEmpty()) {
            byte[] imageBytes = image.getBytes();
            r.setImage(imageBytes);
        }

        Rescue savedRescue = rescueRep.save(r);
        sendEmail(savedRescue);

        if (image != null && !image.isEmpty()) {
            File file = new File("C:\\Users\\91822\\Desktop\\AppDevelopment\\pet-backend\\petcare\\src\\main\\java\\com\\example\\petcare\\uploads\\"+r.getId()+ image.getOriginalFilename());
            image.transferTo(file);
        }
        
        return savedRescue;
    }

    public List<Rescue> getAllRescues() {
        return rescueRep.findAll();
    }
    
    private void sendEmail(Rescue r) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo("testdd2004@gmail.com");
        message.setSubject("New Animal Rescue Report Submitted");
        message.setText("A new animal rescue report has been submitted:\n\n" +
                        "Name: " + r.getName() + "\n" +
                        "Phone Number: " + r.getPhoneNo() + "\n" +
                        "Email: " + r.getEmailId() + "\n" + 
                        "Location: " + r.getLocation() + "\n" +
                        "Condition: " + r.getDescription()
                        );
        mailSender.send(message);
    }
}
