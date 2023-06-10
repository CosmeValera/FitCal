package com.fitcal.api.repository;

import com.fitcal.api.model.Day;
import com.fitcal.api.model.FoodInstance;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface FoodInstanceRepository extends JpaRepository<FoodInstance, Long> {
    List<FoodInstance> findByDayId(Long dayId);
}
