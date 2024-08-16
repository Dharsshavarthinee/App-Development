package com.example.petcare.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.petcare.model.Contact;


public interface ContactRepo extends JpaRepository<Contact,Long>{

    
} 