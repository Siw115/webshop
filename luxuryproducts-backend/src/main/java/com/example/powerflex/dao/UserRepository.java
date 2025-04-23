package com.example.powerflex.dao;

import com.example.powerflex.models.CustomUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface UserRepository extends JpaRepository<CustomUser, UUID> {
    CustomUser findByEmail(String email);

    @Query("SELECT u FROM Users u JOIN u.roles r WHERE r = :role")
    List<CustomUser> findUsersByRole(@Param("role") String role);
}
