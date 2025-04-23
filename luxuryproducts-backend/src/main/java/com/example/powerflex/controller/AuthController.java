package com.example.powerflex.controller;

import com.example.powerflex.config.JWTUtil;
import com.example.powerflex.dao.UserRepository;
import com.example.powerflex.dto.AuthenticationDTO;
import com.example.powerflex.dto.LoginResponse;
import com.example.powerflex.models.CustomUser;
import com.example.powerflex.services.CredentialValidator;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.Collections;
import java.util.List;

@RestController
@CrossOrigin(origins = {"http://localhost:4200", "http://s1149574.student.inf-hsleiden.nl:19574"})
@RequestMapping("/auth")
public class AuthController {

    private final UserRepository userDAO;
    private final JWTUtil jwtUtil;
    private final AuthenticationManager authManager;
    private final PasswordEncoder passwordEncoder;
    private final CredentialValidator validator;

    public AuthController(UserRepository userDAO, JWTUtil jwtUtil, AuthenticationManager authManager,
                          PasswordEncoder passwordEncoder, CredentialValidator validator) {
        this.userDAO = userDAO;
        this.jwtUtil = jwtUtil;
        this.authManager = authManager;
        this.passwordEncoder = passwordEncoder;
        this.validator = validator;
    }

    @PostMapping("/register")
    public ResponseEntity<LoginResponse> register(@RequestBody AuthenticationDTO authenticationDTO) {
        if (!validator.isValidEmail(authenticationDTO.email)) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST, "No valid email provided"
            );
        }

        if (!validator.isValidPassword(authenticationDTO.password)) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST, "No valid password provided"
            );
        }

        CustomUser customUser = userDAO.findByEmail(authenticationDTO.email);

        if (customUser != null){
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND, "Cannot register with this email"
            );
        }

        String encodedPassword = passwordEncoder.encode(authenticationDTO.password);
        List<String> roles = Collections.singletonList("ROLE_USER"); // Default role

        CustomUser registeredCustomUser = new CustomUser(authenticationDTO.email, encodedPassword, roles);
        userDAO.save(registeredCustomUser);

        String token = jwtUtil.generateToken(registeredCustomUser.getEmail(), registeredCustomUser.getRoles());
        LoginResponse loginResponse = new LoginResponse(registeredCustomUser.getEmail(), token, registeredCustomUser.getRoles());
        return ResponseEntity.ok(loginResponse);
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@RequestBody AuthenticationDTO body) {
        try {
            UsernamePasswordAuthenticationToken authInputToken =
                    new UsernamePasswordAuthenticationToken(body.email, body.password);

            authManager.authenticate(authInputToken);

            CustomUser customUser = userDAO.findByEmail(body.email);
            String token = jwtUtil.generateToken(customUser.getEmail(), customUser.getRoles());
            LoginResponse loginResponse = new LoginResponse(customUser.getEmail(), token, customUser.getRoles());

            return ResponseEntity.ok(loginResponse);

        } catch (AuthenticationException authExc) {
            throw new ResponseStatusException(
                    HttpStatus.FORBIDDEN, "No valid credentials"
            );
        }
    }
}
