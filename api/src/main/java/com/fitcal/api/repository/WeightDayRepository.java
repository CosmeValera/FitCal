package com.fitcal.api.repository;

import com.fitcal.api.model.WeightDay;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface WeightDayRepository extends JpaRepository<WeightDay, Long> {
    List<WeightDay> findByUserId(Long userId);
}
