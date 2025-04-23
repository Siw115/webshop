package com.example.powerflex.controller;

import com.example.powerflex.config.JWTUtil;
import com.example.powerflex.dao.ProfileDAO;
import com.example.powerflex.dao.UserRepository;
import com.example.powerflex.models.CustomUser;
import com.example.powerflex.services.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = {"http://localhost:4200", "http://localhost:19574", "http://s1149574.student.inf-hsleiden.nl:19574"})
@RequestMapping("/profile")
public class ProfileController {
    private final UserRepository userRepository;
    private final ProfileDAO profileDAO;
    private final UserService userService;

    public ProfileController(UserRepository userRepository, AuthenticationManager authManager, JWTUtil jwtUtil, ProfileDAO profileDAO, ProfileDAO profileDAO1, UserService userService) {
        this.userRepository = userRepository;
        this.profileDAO = profileDAO1;
        this.userService = userService;
    }

    @GetMapping
    public ResponseEntity<CustomUser> getUserProfile() {
        return ResponseEntity.ok(profileDAO.getCurrentUserProfile());
    }

    @GetMapping(params = "email")
    public ResponseEntity<CustomUser> getCustomUserByEmail(@RequestParam String email) {
        return ResponseEntity.ok(this.userRepository.findByEmail(email));
    }

    public ResponseEntity<Optional<Object>> getUserProfile(Authentication authentication) {
        String email = authentication.getName();  // This retrieves the authenticated user's email
        CustomUser user = userRepository.findByEmail(email);

        if (user == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Optional.ofNullable(null));
        }

        // Convert user to CustomUserDTO if needed and return
        CustomUser userDTO = new CustomUser(user);
        return ResponseEntity.ok(Optional.of(userDTO));
    }

    @GetMapping("/role/{role}")
    public List<CustomUser> getUsersByRole(@PathVariable String role) {
        return userService.getUserByRole(role);
    }

//    @PutMapping("/{id}")
//    public ResponseEntity<CustomUser> updateCustomUserById(@PathVariable long id, @RequestBody CustomUser customUserDetails) {
//        CustomUser updateCustomUser = userRepository.findById(id).get();
//        updateCustomUser.setEmail(customUserDetails.getEmail());
//        updateCustomUser.setPassword(customUserDetails.getPassword());
//        updateCustomUser.setAddress(customUserDetails.getAddress());
//
//        userRepository.save(updateCustomUser);
//        return ResponseEntity.ok(updateCustomUser);
//    }
}
