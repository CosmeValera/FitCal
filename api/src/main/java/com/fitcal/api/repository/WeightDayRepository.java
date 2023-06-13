package com.fitcal.api.repository;

import com.fitcal.api.model.WeightDay;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface WeightDayRepository extends JpaRepository<WeightDay, Long> {
    // You can add custom query methods here if needed
}
