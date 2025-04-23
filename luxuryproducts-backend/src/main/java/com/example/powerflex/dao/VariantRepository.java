package com.example.powerflex.dao;

import com.example.powerflex.models.Variant;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;

import java.util.List;

@Repository
public interface VariantRepository extends JpaRepository<Variant, Long> {
}

