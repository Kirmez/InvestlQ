package net.javaguides.invest.controller;

import net.javaguides.invest.dto.RegisterRequest;
import net.javaguides.invest.model.User;
import net.javaguides.invest.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody RegisterRequest registerRequest) {
        if (userRepository.findByEmail(registerRequest.getEmail()).isPresent()) {
            return ResponseEntity.badRequest().body("Email already in use");
        }

        int maxAttempts = 3;
        for (int attempt = 0; attempt < maxAttempts; attempt++) {
            try {
                User user = new User();
                user.setNombre(registerRequest.getNombre());
                user.setEmail(registerRequest.getEmail());
                user.setPasswordHash(registerRequest.getPassword());
                user.setFechaRegistro(LocalDateTime.now());
                
                userRepository.save(user);
                return ResponseEntity.ok("User registered successfully with ID: " + user.getIdUsuario());
                
            } catch (DataIntegrityViolationException e) {
                if (attempt == maxAttempts - 1) {
                    return ResponseEntity.internalServerError().body("Failed to generate unique ID after " + maxAttempts + " attempts");
                }
            }
        }
        return ResponseEntity.internalServerError().body("Registration failed");
    }
}
