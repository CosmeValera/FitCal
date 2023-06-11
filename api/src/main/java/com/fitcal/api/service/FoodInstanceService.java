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

    /**
     * Obtiene todas las instancias de alimentos.
     * @return Una lista de todas las instancias de alimentos existentes 
     * en la base de datos.
     */
    public List<FoodInstance> getAllFoodInstances() {
        return foodInstanceRepository.findAll();
    }

    /**
     * Obtiene una instancia de alimento por su ID.
     * @param id El ID de la instancia de alimento a obtener.
     * @return Un Optional que contiene la instancia de alimento 
     * encontrada o vacío si no se encuentra.
     */
    public Optional<FoodInstance> getFoodInstanceById(Long id) {
        return foodInstanceRepository.findById(id);
    }

    /**
     * Busca instancias de alimentos por el ID del día.
     * @param dayId El ID del día.
     * @return Una lista de instancias de alimentos que pertenecen 
     * al día con el ID especificado.
    */    
    public List<FoodInstance> findByIdDay(Long dayId) {
        return foodInstanceRepository.findByDayId(dayId);
    }

    public FoodInstance createFoodInstance(FoodInstance foodInstance) {
        System.out.println(foodInstance);
        return foodInstanceRepository.save(foodInstance);
    }

    /**
     * Crea una nueva instancia de alimento.
     * @param foodInstance La instancia de alimento a crear.
     * @return La instancia de alimento creada.
     */
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

    /**
     * Actualiza una instancia de alimento existente.
     * @param id El ID de la instancia de alimento a actualizar.
     * @param updatedFoodInstance La instancia de alimento actualizada.
     * @return La instancia de alimento actualizada, si existe; de lo contrario, 
     * devuelve null o lanza una excepción.
     */
    public boolean deleteFoodInstance(Long id) {
        Optional<FoodInstance> existingFoodInstance = foodInstanceRepository.findById(id);
        if (existingFoodInstance.isPresent()) {
            foodInstanceRepository.delete(existingFoodInstance.get());
            return true;
        }
        return false;
    }

}
