package com.fitcal.api.controller;

import com.fitcal.api.model.UserData;
import com.fitcal.api.service.UserDataService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/user-data")
public class UserDataController {

    private final UserDataService userDataService;

    @Autowired
    public UserDataController(UserDataService userDataService) {
        this.userDataService = userDataService;
    }

    @GetMapping
    public ResponseEntity<List<UserData>> getAllUserData() {
        List<UserData> userData = userDataService.getAllUserData();
        return new ResponseEntity<>(userData, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserData> getUserDataById(@PathVariable("id") Long id) {
        Optional<UserData> userData = userDataService.getUserDataById(id);
        return userData.map(value -> new ResponseEntity<>(value, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PostMapping
    public ResponseEntity<UserData> createUserData(@RequestBody UserData userData) {
        UserData createdUserData = userDataService.createUserData(userData);
        return new ResponseEntity<>(createdUserData, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<UserData> updateUserData(@PathVariable("id") Long id,
                                                   @RequestBody UserData updatedUserData) {
        UserData userData = userDataService.updateUserData(id, updatedUserData);
        return userData != null ? new ResponseEntity<>(userData, HttpStatus.OK)
                : new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUserData(@PathVariable("id") Long id) {
        boolean deleted = userDataService.deleteUserData(id);
        return deleted ? new ResponseEntity<>(HttpStatus.NO_CONTENT)
                : new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
}
