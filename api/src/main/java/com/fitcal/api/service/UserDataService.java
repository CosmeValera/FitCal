package com.fitcal.api.service;

import com.fitcal.api.model.UserData;
import com.fitcal.api.repository.UserDataRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserDataService {

    private final UserDataRepository userDataRepository;

    @Autowired
    public UserDataService(UserDataRepository userDataRepository) {
        this.userDataRepository = userDataRepository;
    }

    public List<UserData> getAllUserData() {
        return userDataRepository.findAll();
    }

    public Optional<UserData> getUserDataById(Long id) {
        return userDataRepository.findById(id);
    }

    public UserData createUserData(UserData userData) {
        return userDataRepository.save(userData);
    }

    public UserData updateUserData(Long id, UserData updatedUserData) {
        Optional<UserData> existingUserData = userDataRepository.findById(id);
        if (existingUserData.isPresent()) {
            UserData userData = existingUserData.get();
            userData.setName(updatedUserData.getName());
            userData.setSurnames(updatedUserData.getSurnames());
            userData.setImage(updatedUserData.getImage());
            userData.setWeight(updatedUserData.getWeight());
            userData.setHeight(updatedUserData.getHeight());
            userData.setGender(updatedUserData.getGender());
            userData.setBirth_date(updatedUserData.getBirth_date()); // Corregido
            userData.setGoal(updatedUserData.getGoal());
            userData.setActivityLevel(updatedUserData.getActivityLevel());
            return userDataRepository.save(userData);
        }
        return null; // or throw an exception
    }


    public boolean deleteUserData(Long id) {
        Optional<UserData> existingUserData = userDataRepository.findById(id);
        if (existingUserData.isPresent()) {
            userDataRepository.delete(existingUserData.get());
            return true;
        }
        return false;
    }
}
