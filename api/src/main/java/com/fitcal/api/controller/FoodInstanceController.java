package com.fitcal.api.controller;

import com.fitcal.api.model.FoodInstance;
import com.fitcal.api.service.FoodInstanceService;

import jakarta.validation.constraints.NotNull;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(value = "*")
@RequestMapping("/food-instances")
public class FoodInstanceController {

    private final FoodInstanceService foodInstanceService;

    @Autowired
    public FoodInstanceController(FoodInstanceService foodInstanceService) {
        this.foodInstanceService = foodInstanceService;
    }

    /**
     * Obtiene todas las instancias de comida.
     * @return Una lista de objetos FoodInstance que representan todas 
     * las instancias de comida.
     */
    @GetMapping
    public ResponseEntity<List<FoodInstance>> getAllFoodInstances() {
        List<FoodInstance> foodInstances = foodInstanceService.getAllFoodInstances();
        return new ResponseEntity<>(foodInstances, HttpStatus.OK);
    }

    /**
     * Obtiene una instancia de comida por su ID.
     * @param id El ID de la instancia de comida.
     * @return Un objeto ResponseEntity que contiene la instancia de 
     * comida encontrada y el estado OK, o el estado NOT_FOUND si no 
     * se encuentra la instancia de comida.
     */
    @GetMapping("/{id}")
    public ResponseEntity<FoodInstance> getFoodInstanceById(@PathVariable("id") Long id) {
        Optional<FoodInstance> foodInstance = foodInstanceService.getFoodInstanceById(id);
        return foodInstance.map(value -> new ResponseEntity<>(value, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    /**
     * Busca instancias de comida por el ID del día.
     * @param dayId El ID del día.
     * @return Una lista de instancias de comida relacionadas con el 
     * día especificado.
     */
    @GetMapping("/search/{dayId}")
    public List<FoodInstance> searchByIdDay(@PathVariable("dayId") @NotNull Long dayId) {
        return foodInstanceService.findByIdDay(dayId);
    }

    /**
     * Crea una nueva instancia de comida.
     * @param foodInstance El objeto FoodInstance a crear.
     * @return Un objeto ResponseEntity que contiene la instancia de comida 
     * creada y el estado CREATED.
     */
    @PostMapping
    public ResponseEntity<FoodInstance> createFoodInstance(@RequestBody FoodInstance foodInstance) {
        FoodInstance createdFoodInstance = foodInstanceService.createFoodInstance(foodInstance);
        return new ResponseEntity<>(createdFoodInstance, HttpStatus.CREATED);
    }

    /**
     * Actualiza una instancia de comida existente.
     * @param id El ID de la instancia de comida a actualizar.
     * @param updatedFoodInstance El objeto FoodInstance actualizado.
     * @return Un objeto ResponseEntity que contiene la instancia de comida 
     * actualizada y el estado OK, o el estado NOT_FOUND si no se encuentra 
     * la instancia de comida.
     */
    @PutMapping("/{id}")
    public ResponseEntity<FoodInstance> updateFoodInstance(@PathVariable("id") Long id,
                                                        @RequestBody FoodInstance updatedFoodInstance) {
        FoodInstance foodInstance = foodInstanceService.updateFoodInstance(id, updatedFoodInstance);
        return foodInstance != null ? new ResponseEntity<>(foodInstance, HttpStatus.OK)
                : new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    /**
     * Elimina una instancia de comida por su ID.
     * @param id El ID de la instancia de comida a eliminar.
     * @return Un objeto ResponseEntity con el estado NO_CONTENT si se 
     * elimina la instancia de comida, o el estado NOT_FOUND si no se 
     * encuentra la instancia de comida.
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteFoodInstance(@PathVariable("id") Long id) {
        boolean deleted = foodInstanceService.deleteFoodInstance(id);
        return deleted ? new ResponseEntity<>(HttpStatus.NO_CONTENT)
                : new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
}
