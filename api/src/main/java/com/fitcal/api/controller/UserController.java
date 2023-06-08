package com.fitcal.api.controller;

import com.fitcal.api.model.User;
import com.fitcal.api.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(value = "*")
@RequestMapping("/users")
public class UserController {

    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping
    public ResponseEntity<List<User>> getAllUsers() {
        List<User> users = userService.getAllUsers();
        return new ResponseEntity<>(users, HttpStatus.OK);
    }

    // @GetMapping("/{idToken}")
    // public ResponseEntity<User> checkUserExists(@PathVariable("idToken") String idToken) {
    //     Optional<User> user = userService.getUserByIdToken(idToken);
    //     return user.map(value -> new ResponseEntity<>(value, HttpStatus.OK))
    //             .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    // }


    @GetMapping("/{email}")
    public ResponseEntity<User> checkUserExists2(@PathVariable("email") String email) {
        Optional<User> user = userService.getUserByEmail(email);
        return user.map(value -> new ResponseEntity<>(value, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PostMapping
    public ResponseEntity<User> createUser(@RequestBody User user) {
        User createdUser = userService.createUser(user);
        return new ResponseEntity<>(createdUser, HttpStatus.CREATED);
    }

    // @PutMapping("/{id}")
    // public ResponseEntity<User> updateUser(@PathVariable("id") Long id, @RequestBody User updatedUser) {
    //     User user = userService.updateUser(id, updatedUser);
    //     return user != null ? new ResponseEntity<>(user, HttpStatus.OK)
    //             : new ResponseEntity<>(HttpStatus.NOT_FOUND);
    // }

    // Actualizar un perfil existente
    @PutMapping("/{id}")
    public ResponseEntity<User> updateUser(@PathVariable Long id, @RequestBody User user) {
        User updatedUser = userService.updateUserProfile(id, user);
        if (updatedUser != null) {
            return ResponseEntity.ok(updatedUser);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable("id") Long id) {
        boolean deleted = userService.deleteUser(id);
        return deleted ? new ResponseEntity<>(HttpStatus.NO_CONTENT)
                : new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
}
