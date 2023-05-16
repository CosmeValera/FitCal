package com.fitcal.api.service;

import com.fitcal.api.model.Food;
import com.fitcal.api.repository.FoodRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FoodService {
    private final FoodRepository foodRepository;

    @Autowired
    public FoodService(FoodRepository foodRepository) {
        this.foodRepository = foodRepository;
    }

    public List<Food> getAllFoods() {
        return foodRepository.findAll();
    }

    public Food getFoodById(Long id) {
        return foodRepository.findById(id).orElse(null);
    }

    public Food createFood(Food food) {
        return foodRepository.save(food);
    }

    public Food updateFood(Long id, Food updatedFood) {
        if (foodRepository.existsById(id)) {
            updatedFood.setId(id);
            return foodRepository.save(updatedFood);
        } else {
            return null;
        }
    }

    public boolean deleteFood(Long id) {
        if (foodRepository.existsById(id)) {
            foodRepository.deleteById(id);
            return true;
        } else {
            return false;
        }
    }
}