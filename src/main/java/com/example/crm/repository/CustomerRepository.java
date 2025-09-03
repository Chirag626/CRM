package com.example.crm.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.crm.model.Customer;

public interface CustomerRepository extends JpaRepository<Customer, Long> {}
