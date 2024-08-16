package com.example.petcare.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.petcare.model.Login;
import com.example.petcare.service.LoginService;

@RestController
public class LoginController {

    @Autowired
    private LoginService loginService;

    @PostMapping("/api/login-user")
    public ResponseEntity<String> login(@RequestBody Login loginRequest) {
        System.out.println("Login attempt with email: " + loginRequest.getEmailId());
        System.out.println("Password: " + loginRequest.getPassword());
        boolean isAuthenticated = loginService.authenticate(loginRequest);
        if (isAuthenticated) {
            return ResponseEntity.ok("Login successful");
        } else {
            return ResponseEntity.status(401).body("Invalid email or password");
        }
    }
    
}
