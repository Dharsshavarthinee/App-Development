package com.example.petcare.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import com.example.petcare.model.Register;

import com.example.petcare.repository.RegisterRepo;

@Service
public class RegisterService {
    
       @Autowired
        RegisterRepo RegRep;

    public Register addDetails(Register r)
    {
        return RegRep.save(r);
    }

    public List<Register> getDetails()
    {
        return RegRep.findAll();
    }
    
    public Register getByEmail(String emailId)
    {
        return RegRep.findByEmailId(emailId);
    }

    public void delUser(long id)
    {
        RegRep.deleteById(id);
            
    }
}

