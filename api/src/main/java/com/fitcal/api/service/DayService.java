package com.fitcal.api.service;

import com.fitcal.api.model.Day;
import com.fitcal.api.model.User;
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

    public List<Day> getAllDays() {
        return dayRepository.findAll();
    }

    public Optional<Day> getDayById(Long id) {
        return dayRepository.findById(id);
    }
    
    /* Creamos la tabla DAY */
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

    /* Buscamos segun el usuario y fecha el dato en la tabla Day */
    public Optional<Day> getDayByIdAndDate(User user_id, LocalDate fecha) {
        return dayRepository.findByUserIdAndDate(user_id, fecha);
    }

    public Optional<Day> findByUserIdAndDate(User userId, LocalDate date) {
        return this.dayRepository.findByUserIdAndDate(userId, date);
    }

    public List<Day> findByDateAndUserId(LocalDate date, Long userId) {
        return dayRepository.findByDateAndUserId(date, userId);
    }
}
