package com.weather.backend.user.controller;

import com.weather.backend.user.dto.UpdateUserRequest;
import com.weather.backend.user.dto.UserDto;
import com.weather.backend.user.exception.UserDoesNotExistException;
import com.weather.backend.user.exception.UserNotFoundException;
import com.weather.backend.user.models.User;
import com.weather.backend.user.service.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@Controller
@RequestMapping("/api/users")
public class UserHttpController {

    private final Logger LOG = LoggerFactory.getLogger(getClass());
    private final UserService userService;

    public UserHttpController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping
    public ResponseEntity<List<User>> getAll() {
        LOG.info("Getting users");
        List<User> users = this.userService.getAll();
        return ResponseEntity.ok(users);
    }

    @GetMapping("/{userId}")
    public ResponseEntity<User> getUser(@PathVariable String userId) throws UserNotFoundException {
        LOG.info("Getting user with id {}", userId);
        User users = this.userService.find(userId);
        return ResponseEntity.ok(users);
    }

    @PostMapping()
    public ResponseEntity<User> createUser(@RequestBody User user) {
        return ResponseEntity.ok(this.userService.create(user));
    }

    @PatchMapping("/{userId}")
    public ResponseEntity<UserDto> updateUser(@PathVariable String userId,
                                              @RequestBody UpdateUserRequest updateUserRequest) throws UserDoesNotExistException {
        return ResponseEntity.ok(this.userService.update(userId, updateUserRequest));
    }
}
