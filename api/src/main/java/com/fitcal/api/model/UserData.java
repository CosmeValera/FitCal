package com.fitcal.api.model;

import com.fitcal.api.enums.ActivityLevel;
import com.fitcal.api.enums.Goals;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table
@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserData {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(name = "id") // Clave externa que se utiliza para vincular los registros de ambas tablas
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

    // Un UserData tiene muchos dias
    @OneToMany(mappedBy = "userData", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Day> days = new ArrayList<>();

}