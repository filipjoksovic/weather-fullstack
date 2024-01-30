package com.weather.backend.user.exception;

public class UserDoesNotExistException extends Throwable {
    public UserDoesNotExistException(String userId) {
        super("User with id " + userId + " does not exist");
    }
}
