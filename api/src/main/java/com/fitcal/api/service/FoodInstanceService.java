package com.fitcal.api.service;

import com.fitcal.api.model.FoodInstance;
import com.fitcal.api.repository.FoodInstanceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class FoodInstanceService {

    private final FoodInstanceRepository foodInstanceRepository;

    @Autowired
    public FoodInstanceService(FoodInstanceRepository foodInstanceRepository) {
        this.foodInstanceRepository = foodInstanceRepository;
    }

    public List<FoodInstance> getAllFoodInstances() {
        return foodInstanceRepository.findAll();
    }

    public Optional<FoodInstance> getFoodInstanceById(Long id) {
        return foodInstanceRepository.findById(id);
    }

    public FoodInstance createFoodInstance(FoodInstance foodInstance) {
        return foodInstanceRepository.save(foodInstance);
    }

    public FoodInstance updateFoodInstance(Long id, FoodInstance updatedFoodInstance) {
        Optional<FoodInstance> existingFoodInstance = foodInstanceRepository.findById(id);
        if (existingFoodInstance.isPresent()) {
            FoodInstance foodInstance = existingFoodInstance.get();
            foodInstance.setFood(updatedFoodInstance.getFood());
            foodInstance.setMealType(updatedFoodInstance.getMealType());
            foodInstance.setGrams(updatedFoodInstance.getGrams());
            foodInstance.setDay(updatedFoodInstance.getDay());
            return foodInstanceRepository.save(foodInstance);
        }
        return null; // or throw an exception
    }

    public boolean deleteFoodInstance(Long id) {
        Optional<FoodInstance> existingFoodInstance = foodInstanceRepository.findById(id);
        if (existingFoodInstance.isPresent()) {
            foodInstanceRepository.delete(existingFoodInstance.get());
            return true;
        }
        return false;
    }
}
