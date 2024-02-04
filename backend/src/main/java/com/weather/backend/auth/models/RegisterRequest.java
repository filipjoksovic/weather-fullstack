package com.weather.backend.auth.models;

public record RegisterRequest(String email, String password, String firstName, String lastName) {
}
