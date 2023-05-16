package com.fitcal.api.userdata.repository;

import com.fitcal.api.food.model.Food;
import com.fitcal.api.userdata.model.UserData;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserDataRepository extends JpaRepository<UserData, Long> {
}
