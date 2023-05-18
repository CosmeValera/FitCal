package com.fitcal.api.controller;

import com.fitcal.api.model.FoodInstance;
import com.fitcal.api.service.FoodInstanceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/food-instances")
public class FoodInstanceController {

    private final FoodInstanceService foodInstanceService;

    @Autowired
    public FoodInstanceController(FoodInstanceService foodInstanceService) {
        this.foodInstanceService = foodInstanceService;
    }

    @GetMapping
    public ResponseEntity<List<FoodInstance>> getAllFoodInstances() {
        List<FoodInstance> foodInstances = foodInstanceService.getAllFoodInstances();
        return new ResponseEntity<>(foodInstances, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<FoodInstance> getFoodInstanceById(@PathVariable("id") Long id) {
        Optional<FoodInstance> foodInstance = foodInstanceService.getFoodInstanceById(id);
        return foodInstance.map(value -> new ResponseEntity<>(value, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PostMapping
    public ResponseEntity<FoodInstance> createFoodInstance(@RequestBody FoodInstance foodInstance) {
        FoodInstance createdFoodInstance = foodInstanceService.createFoodInstance(foodInstance);
        return new ResponseEntity<>(createdFoodInstance, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<FoodInstance> updateFoodInstance(@PathVariable("id") Long id,
                                                           @RequestBody FoodInstance updatedFoodInstance) {
        FoodInstance foodInstance = foodInstanceService.updateFoodInstance(id, updatedFoodInstance);
        return foodInstance != null ? new ResponseEntity<>(foodInstance, HttpStatus.OK)
                : new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteFoodInstance(@PathVariable("id") Long id) {
        boolean deleted = foodInstanceService.deleteFoodInstance(id);
        return deleted ? new ResponseEntity<>(HttpStatus.NO_CONTENT)
                : new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
}
