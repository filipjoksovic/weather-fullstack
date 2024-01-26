package com.weather.backend.user.service;

import com.weather.backend.user.exception.UserNotFoundException;
import com.weather.backend.user.models.User;
import com.weather.backend.user.repository.UserRepository;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserServiceImpl implements UserService {
    Logger LOG = LoggerFactory.getLogger(getClass());
    UserRepository userRepository;

    UserServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public List<User> getAll() {
        return this.userRepository.findAll();
    }

    public User find(String userId) throws UserNotFoundException {

        return this.userRepository.findById(userId).orElseThrow(UserNotFoundException::new);
    }

    public User create(User user) {
        return this.userRepository.save(user);
    }

    public User update(User user) {
        return this.userRepository.save(user);
    }
}
