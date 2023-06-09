package com.fitcal.api.repository;

import com.fitcal.api.model.Day;
import com.fitcal.api.model.User;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface DayRepository extends JpaRepository<Day, Long> {
    java.util.Optional<Day> findByUserIdAndDate(User userId, LocalDate date);
    List<Day> findByDateAndUserId(LocalDate date, Long userId);

}
