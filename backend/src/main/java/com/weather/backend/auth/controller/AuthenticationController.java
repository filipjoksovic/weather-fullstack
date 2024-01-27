package com.weather.backend.auth.controller;

import com.weather.backend.auth.models.AuthenticationResponse;
import com.weather.backend.auth.models.LoginRequest;
import com.weather.backend.auth.models.RegisterRequest;
import com.weather.backend.auth.service.AuthenticationService;
import com.weather.backend.user.exception.UserNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthenticationController {

    private final AuthenticationService authenticationService;

    @PostMapping("/signup")
    public ResponseEntity<AuthenticationResponse> register(@RequestBody RegisterRequest request) throws UserNotFoundException {
        return ResponseEntity.ok(authenticationService.register(request));
    }

    @PostMapping("/login")
    public ResponseEntity<AuthenticationResponse> login(@RequestBody LoginRequest request) throws UserNotFoundException {
        return ResponseEntity.ok(authenticationService.login(request));

    }
}
