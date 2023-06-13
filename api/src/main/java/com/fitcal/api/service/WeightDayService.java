package com.fitcal.api.service;

import com.fitcal.api.model.WeightDay;
import com.fitcal.api.repository.WeightDayRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class WeightDayService {

    private final WeightDayRepository weightDayRepository;

    @Autowired
    public WeightDayService(WeightDayRepository weightDayRepository) {
        this.weightDayRepository = weightDayRepository;
    }

    public List<WeightDay> getAllWeightDays() {
        return weightDayRepository.findAll();
    }

    public Optional<WeightDay> getWeightDayById(Long id) {
        return weightDayRepository.findById(id);
    }

    public WeightDay createWeightDay(WeightDay weightDay) {
        return weightDayRepository.save(weightDay);
    }

    public WeightDay updateWeightDay(Long id, WeightDay weightDay) {
        if (weightDayRepository.existsById(id)) {
            weightDay.setId(id);
            return weightDayRepository.save(weightDay);
        } else {
            throw new IllegalArgumentException("WeightDay not found with ID: " + id);
        }
    }

    public void deleteWeightDay(Long id) {
        weightDayRepository.deleteById(id);
    }
}
