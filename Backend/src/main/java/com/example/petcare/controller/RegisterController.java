package com.example.petcare.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;


import com.example.petcare.model.Register;
import com.example.petcare.service.RegisterService;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;


@RestController
public class RegisterController {
    

    
    @Autowired 
    RegisterService RegSer;
    @PostMapping("/api/Register-user")
        public Register addDetails(@RequestBody Register r)
        {
            return RegSer.addDetails(r);
        }

    @GetMapping("/api/Register-user/user")
    public List<Register> getDetails()
    {
        return RegSer.getDetails();
    }
    
    @GetMapping("/api/Register-user")
    public Register getDetails(@RequestParam String emailId)
    {
        return RegSer.getByEmail(emailId);
    }

    @DeleteMapping("/api/Register-user/user")
    public void delUser(@RequestParam long id)
    {
         RegSer.delUser(id);
    }
}
