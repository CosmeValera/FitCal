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

    /**
     * Obtiene todos los alimentos.
     * @return Una lista de todos los alimentos existentes en la base de datos.
     */
    public List<Food> getAllFoods() {
        return foodRepository.findAll();
    }

    /**
     * Obtiene un alimento por su ID.
     * @param id El ID del alimento a obtener.
     * @return El alimento encontrado o null si no se encuentra.
     */
    public Food getFoodById(Long id) {
        return foodRepository.findById(id).orElse(null);
    }

    /**
     * Crea un nuevo alimento.
     * @param food Crea un nuevo alimento.
     * @return  El alimento creado.
     */
    public Food createFood(Food food) {
        return foodRepository.save(food);
    }

    /**
     * Actualiza un alimento existente.
     * @param id El ID del alimento a actualizar.
     * @param updatedFood El objeto Food actualizado.
     * @return El alimento actualizado, si existe; de lo contrario, devuelve null.
     */
    public Food updateFood(Long id, Food updatedFood) {
        if (foodRepository.existsById(id)) {
            updatedFood.setId(id);
            return foodRepository.save(updatedFood);
        } else {
            return null;
        }
    }

    /**
     * Elimina un alimento existente.
     * @param id El ID del alimento a eliminar.
     * @return true si el alimento se eliminó correctamente; 
     * false si no se encontró el alimento.
     */
    public boolean deleteFood(Long id) {
        if (foodRepository.existsById(id)) {
            foodRepository.deleteById(id);
            return true;
        } else {
            return false;
        }
    }
}