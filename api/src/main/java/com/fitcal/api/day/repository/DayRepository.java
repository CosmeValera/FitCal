package com.fitcal.api.day.repository;

import com.fitcal.api.day.model.Day;
import com.fitcal.api.food.model.Food;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DayRepository extends JpaRepository<Day, Long> {
}
