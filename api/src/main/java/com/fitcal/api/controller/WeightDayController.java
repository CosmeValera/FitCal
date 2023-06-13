package com.fitcal.api.controller;

import com.fitcal.api.model.WeightDay;
import com.fitcal.api.service.WeightDayService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/weight-days")
public class WeightDayController {

    private final WeightDayService weightDayService;

    @Autowired
    public WeightDayController(WeightDayService weightDayService) {
        this.weightDayService = weightDayService;
    }

    @GetMapping
    public ResponseEntity<List<WeightDay>> getAllWeightDays() {
        List<WeightDay> weightDays = weightDayService.getAllWeightDays();
        return ResponseEntity.ok(weightDays);
    }

    @GetMapping("/{id}")
    public ResponseEntity<WeightDay> getWeightDayById(@PathVariable Long id) {
        Optional<WeightDay> weightDay = weightDayService.getWeightDayById(id);
        return weightDay.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<WeightDay> createWeightDay(@RequestBody WeightDay weightDay) {
        WeightDay createdWeightDay = weightDayService.createWeightDay(weightDay);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdWeightDay);
    }

    @PutMapping("/{id}")
    public ResponseEntity<WeightDay> updateWeightDay(@PathVariable Long id, @RequestBody WeightDay weightDay) {
        WeightDay updatedWeightDay = weightDayService.updateWeightDay(id, weightDay);
        return ResponseEntity.ok(updatedWeightDay);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteWeightDay(@PathVariable Long id) {
        weightDayService.deleteWeightDay(id);
        return ResponseEntity.noContent().build();
    }
}
