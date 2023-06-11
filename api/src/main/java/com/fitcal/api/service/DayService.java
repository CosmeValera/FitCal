package com.fitcal.api.service;

import com.fitcal.api.model.Day;
import com.fitcal.api.repository.DayRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class DayService {

    private final DayRepository dayRepository;

    @Autowired
    public DayService(DayRepository dayRepository) {
        this.dayRepository = dayRepository;
    }

    /**
     * Obtiene todos los días.
     * @return Una lista de todos los días existentes en la base de datos.
     */
    public List<Day> getAllDays() {
        return dayRepository.findAll();
    }

    /**
     * Obtiene un día por su ID.
     * @param id El ID del día a obtener.
     * @return Un Optional que contiene el día encontrado o vacío si no se encuentra.
     */
    public Optional<Day> getDayById(Long id) {
        return dayRepository.findById(id);
    }
    
    /**
     * Crea un nuevo día.
     * @param day El objeto Day a crear.
     * @return El día creado.
     */
    public Day createDay(Day day) {
        return dayRepository.save(day);
    }

    /**
     * Actualiza un día existente.
     * @param id El ID del día a actualizar.
     * @param updatedDay El objeto Day actualizado.
     * @return El día actualizado, si existe; de lo contrario, 
     * devuelve null o lanza una excepción.
     */
    public Day updateDay(Long id, Day updatedDay) {
        Optional<Day> existingDay = dayRepository.findById(id);
        if (existingDay.isPresent()) {
            Day day = existingDay.get();
            day.setDate(updatedDay.getDate());
            day.setFoodInstances(updatedDay.getFoodInstances());
            return dayRepository.save(day);
        }
        return null; // or throw an exception
    }

    /**
     * Elimina un día existente.
     * @param id El ID del día a eliminar.
     * @return true si el día se eliminó correctamente; false si no se encontró el día.
     */
    public boolean deleteDay(Long id) {
        Optional<Day> existingDay = dayRepository.findById(id);
        if (existingDay.isPresent()) {
            dayRepository.delete(existingDay.get());
            return true;
        }
        return false;
    }

    /**
     * Elimina un día existente.
     * @param id El ID del día a eliminar.
     * @return true si el día se eliminó correctamente; false si no se encontró el día.
    */    
    public List<Day> findByDateAndUserId(LocalDate date, Long userId) {
        return dayRepository.findByDateAndUserId(date, userId);
    }
}
