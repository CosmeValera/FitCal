package com.fitcal.api.controller;

import com.fitcal.api.model.Day;
import com.fitcal.api.service.DayService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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

    @GetMapping
    public ResponseEntity<List<Day>> getAllDays() {
        List<Day> days = dayService.getAllDays();
        return new ResponseEntity<>(days, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Day> getDayById(@PathVariable("id") Long id) {
        Optional<Day> day = dayService.getDayById(id);
        return day.map(value -> new ResponseEntity<>(value, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PostMapping
    public ResponseEntity<Day> createDay(@RequestBody Day day) {
        Day createdDay = dayService.createDay(day);
        return new ResponseEntity<>(createdDay, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Day> updateDay(@PathVariable("id") Long id, @RequestBody Day updatedDay) {
        Day day = dayService.updateDay(id, updatedDay);
        return day != null ? new ResponseEntity<>(day, HttpStatus.OK)
                : new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteDay(@PathVariable("id") Long id) {
        boolean deleted = dayService.deleteDay(id);
        return deleted ? new ResponseEntity<>(HttpStatus.NO_CONTENT)
                : new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
}
