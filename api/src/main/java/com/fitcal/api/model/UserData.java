package com.fitcal.api.model;

import com.fitcal.api.enums.ActivityLevel;
import com.fitcal.api.enums.Goals;
import com.fitcal.api.model.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Entity
@Table
@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserData {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long user_id;
    @OneToOne
    @JoinColumn(name = "user_id") // Clave externa que se utiliza para vincular los registros de ambas tablas
    private User user;
    @Column(nullable = false)
    private String name;
    @Column(nullable = false)
    private String surnames;
    @Column(nullable = false)
    private String image;
    @Column(nullable = false)
    private double weight;
    @Column(nullable = false)
    private int height;
    @Column(nullable = false)
    private char gender;
    @Column(nullable = false)
    private LocalDate birth_date;
    @Column(nullable = false)
    private Goals goal;
    @Column(nullable = false)
    private ActivityLevel activityLevel;

}