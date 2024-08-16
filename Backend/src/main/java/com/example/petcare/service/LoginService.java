package com.example.petcare.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.petcare.repository.LoginRepo;
import com.example.petcare.repository.RegisterRepo;
import com.example.petcare.model.Login;
import com.example.petcare.model.Register;

@Service
public class LoginService {

    @Autowired
    private RegisterRepo registerRepo;

    @Autowired
    LoginRepo loginRepo;
    
    public boolean authenticate(Login loginRequest) {
        System.out.println("Attempting to authenticate user with email: " + loginRequest.getEmailId());
        Register user = registerRepo.findByEmailId(loginRequest.getEmailId());
        if (user != null) {
            System.out.println("User found: " + user.getEmailId());
            if (user.getPassword().equals(loginRequest.getPassword())) {
                loginRepo.save(loginRequest);
                return true;
            } else {
                System.out.println("Invalid password");
            }
        } else {
            System.out.println("User not found");
        }
        return false;
    }
}
