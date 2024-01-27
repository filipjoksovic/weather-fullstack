package com.weather.backend.user.service;

import com.weather.backend.user.exception.UserNotFoundException;
import com.weather.backend.user.models.User;

import java.util.List;

public interface UserService {

    List<User> getAll();

    User find(String id) throws UserNotFoundException;

    User findByEmail(String email) throws UserNotFoundException;

    User create(User user);

    User update(User user);

}
