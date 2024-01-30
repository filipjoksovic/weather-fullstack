package com.weather.backend.user.service;

import com.weather.backend.user.dto.UpdateUserRequest;
import com.weather.backend.user.dto.UserDto;
import com.weather.backend.user.exception.UserDoesNotExistException;
import com.weather.backend.user.exception.UserNotFoundException;
import com.weather.backend.user.models.User;
import com.weather.backend.user.repository.UserRepository;
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

        return this.userRepository.findById(userId)
                                  .orElseThrow(UserNotFoundException::new);
    }

    @Override
    public User findByEmail(String email) throws UserNotFoundException {
        return this.userRepository.findByEmail(email)
                                  .orElseThrow(() -> new UserNotFoundException(email));
    }

    @Override
    public User create(User user) {
        return this.userRepository.save(user);
    }


    //TODO improve this by using mappings or something that doesn't require
    // Read followed by write
    @Override
    public UserDto update(String userId, UpdateUserRequest userRequest) throws UserDoesNotExistException {
        LOG.info("upd usr {}", userId);

        User user =
                userRepository.findById(userId)
                              .orElseThrow(() -> new UserDoesNotExistException(userId));

        if (userRequest.firstName() != null) {
            user.setFirstName(userRequest.firstName());
        }
        if (userRequest.lastName() != null) {
            user.setLastName(userRequest.lastName());
        }
        if (userRequest.email() != null) {
            user.setEmail(userRequest.email());
        }

        return UserDto.to(userRepository.save(user));
    }

    private boolean assertUserExists(String userId) throws UserDoesNotExistException {
        if (userRepository.existsById(userId)) {
            return true;
        } else {
            throw new UserDoesNotExistException(userId);
        }
    }
}
