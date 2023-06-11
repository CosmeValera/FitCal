package com.fitcal.api.controller;

import com.fitcal.api.model.Food;
import com.fitcal.api.service.FoodService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(value = "*")
@RequestMapping("fitcal/food")
public class FoodController {
    private final FoodService foodService;

    @Autowired
    public FoodController(FoodService foodService) {
        this.foodService = foodService;
    }

    /**
     * Obtiene todas las comidas.
     * @return Una lista de objetos Food que representan todas las comidas.
     */    
    @GetMapping
    public List<Food> getAllFoods() {
        return foodService.getAllFoods();
    }

    /**
     * Obtiene una comida por su ID.
     * @param id El ID de la comida.
     * @return Un objeto ResponseEntity que contiene la comida encontrada y 
     * el estado OK, o el estado NOT_FOUND si no se encuentra la comida.
    */    
    @GetMapping("/{id}")
    public ResponseEntity<Food> getFoodById(@PathVariable Long id) {
        Food food = foodService.getFoodById(id);
        if (food != null) {
            return ResponseEntity.ok(food);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    /**
     * Crea una nueva comida.
     * @param food El objeto Food a crear.
     * @return Un objeto ResponseEntity que contiene la comida creada y 
     * el estado CREATED.
     */    
    @PostMapping
    public ResponseEntity<Food> createFood(@RequestBody Food food) {
        Food createdFood = foodService.createFood(food);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdFood);
    }

    /**
     * Actualiza una comida existente.
     * @param id El ID de la comida a actualizar.
     * @param food El objeto Food actualizado.
     * @return Un objeto ResponseEntity que contiene la comida actualizada y 
     * el estado OK, o el estado NOT_FOUND si no se encuentra la comida.
     */    
    @PutMapping("/{id}")
    public ResponseEntity<Food> updateFood(@PathVariable Long id, @RequestBody Food food) {
        Food updatedFood = foodService.updateFood(id, food);
        if (updatedFood != null) {
            return ResponseEntity.ok(updatedFood);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    /**
     * Elimina una comida por su ID.
     * @param id El ID de la comida a eliminar.
     * @return Un objeto ResponseEntity con el estado NO_CONTENT si se 
     * elimina la comida, o el estado NOT_FOUND si no se encuentra la comida.
    */    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteFood(@PathVariable Long id) {
        boolean deleted = foodService.deleteFood(id);
        if (deleted) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
