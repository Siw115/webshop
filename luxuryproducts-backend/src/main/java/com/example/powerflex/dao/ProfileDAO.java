package com.example.powerflex.dao;

import com.example.powerflex.dto.ProfileDTO;
import com.example.powerflex.models.CustomUser;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class ProfileDAO {

    private final UserRepository userRepository;

    public ProfileDAO(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public List<CustomUser> getAllUsers() {
        return this.userRepository.findAll();
    }

    public CustomUser getCurrentUserProfile() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName();
        return userRepository.findByEmail(email);
    }
}
