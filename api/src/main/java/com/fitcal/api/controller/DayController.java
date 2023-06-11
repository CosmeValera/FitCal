package com.fitcal.api.controller;

import com.fitcal.api.model.Day;
import com.fitcal.api.service.DayService;

import jakarta.validation.constraints.NotNull;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(value = "*")
@RequestMapping("/days")
public class DayController {

    private final DayService dayService;

    @Autowired
    public DayController(DayService dayService) {
        this.dayService = dayService;
    }

    /**
     * Obtiene todos los días.
     * @return Un objeto ResponseEntity que contiene la lista de días y 
     * el estado OK.
     */
    @GetMapping
    public ResponseEntity<List<Day>> getAllDays() {
        List<Day> days = dayService.getAllDays();
        return new ResponseEntity<>(days, HttpStatus.OK);
    }

    /**
     * Obtiene un día por su ID.
     * @param id El ID del día.
     * @return Un objeto ResponseEntity que contiene el día encontrado 
     * y el estado OK, o el estado NOT_FOUND si no se encuentra el día.
     */
    @GetMapping("/{id}")
    public ResponseEntity<Day> getDayById(@PathVariable("id") Long id) {
        Optional<Day> day = dayService.getDayById(id);
        return day.map(value -> new ResponseEntity<>(value, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    /**
     * Busca los días por fecha y usuario.
     * @param date La fecha.
     * @param userId El ID del usuario.
     * @return Una lista de días que coinciden con la fecha y el usuario especificados.
     */    
    @GetMapping("/search")
    public List<Day> searchByDateAndUser(@RequestParam @NotNull LocalDate date,
                                        @RequestParam @NotNull Long userId) {
        return dayService.findByDateAndUserId(date, userId);
    }

    /**
     * Crea un nuevo día.
     * @param day El objeto Day a crear.
     * @return Un objeto ResponseEntity que contiene el día creado y 
     * el estado CREATED.
     */
    @PostMapping
    public ResponseEntity<Day> createDay(@RequestBody Day day) {
        Day createdDay = dayService.createDay(day);
        return new ResponseEntity<>(createdDay, HttpStatus.CREATED);
    }

    /**
     * Crea un nuevo día.
     * @param day El objeto Day a crear.
     * @return Un objeto ResponseEntity que contiene el día creado 
     * y el estado CREATED.
     */
    @PutMapping("/{id}")
    public ResponseEntity<Day> updateDay(@PathVariable("id") Long id, @RequestBody Day updatedDay) {
        Day day = dayService.updateDay(id, updatedDay);
        return day != null ? new ResponseEntity<>(day, HttpStatus.OK)
                : new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    /**
     * Elimina un día por su ID.
     * @param id El ID del día a eliminar.
     * @return Un objeto ResponseEntity con el estado NO_CONTENT si 
     * se elimina el día, o el estado NOT_FOUND si no se encuentra el día.
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteDay(@PathVariable("id") Long id) {
        boolean deleted = dayService.deleteDay(id);
        return deleted ? new ResponseEntity<>(HttpStatus.NO_CONTENT)
                : new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
}
