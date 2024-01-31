package com.weather.backend.user.service;

import com.weather.backend.user.dto.*;
import com.weather.backend.user.exception.UserDoesNotExistException;
import com.weather.backend.user.exception.UserNotFoundException;
import com.weather.backend.user.models.User;

import java.util.List;

public interface UserService {

    List<User> getAll();

    User find(String id) throws UserNotFoundException;

    User findByEmail(String email) throws UserNotFoundException;

    User create(User user);

    UserDto update(String userId, UpdateUserRequest userRequest) throws UserDoesNotExistException;

    UserSettingsDto updateUserSettings(String userId,
                                       UpdateUserSettingsRequest userSettingsRequest) throws UserDoesNotExistException;

    UserUnitSettingsDto updateUserUnitSettings(String userId, UpdateUserUnitSettingsRequest updateUserUnitSettingsRequest) throws UserDoesNotExistException;
}
