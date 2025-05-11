package net.javaguides.invest.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import net.javaguides.invest.model.User;
import net.javaguides.invest.repository.UserRepository;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public Optional<User> authenticate(String email, String password) {
        return userRepository.findByEmail(email)
                .filter(user -> user.getPasswordHash().equals(password));
    }
}