package com.fitcal.api.service;

import com.fitcal.api.model.Day;
import com.fitcal.api.repository.DayRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class DayService {

    private final DayRepository dayRepository;

    @Autowired
    public DayService(DayRepository dayRepository) {
        this.dayRepository = dayRepository;
    }

    public List<Day> getAllDays() {
        return dayRepository.findAll();
    }

    public Optional<Day> getDayById(Long id) {
        return dayRepository.findById(id);
    }

    public Day createDay(Day day) {
        return dayRepository.save(day);
    }

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

    public boolean deleteDay(Long id) {
        Optional<Day> existingDay = dayRepository.findById(id);
        if (existingDay.isPresent()) {
            dayRepository.delete(existingDay.get());
            return true;
        }
        return false;
    }
}
