package com.example.powerflex.dao;

import com.example.powerflex.models.Address;
import com.example.powerflex.models.OrderLine;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AddressRepository extends JpaRepository<Address, Long> {
}
