package com.weather.backend.user.exception;

public class UserNotFoundException extends Throwable {

    public UserNotFoundException(String message) {
        super(message);
    }

    public UserNotFoundException() {
        super("User not found");
    }

}
