package com.fitcal.api.repository;

import com.fitcal.api.model.Day;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface DayRepository extends JpaRepository<Day, Long> {
    List<Day> findByDateAndUserId(LocalDate date, Long userId);
}
