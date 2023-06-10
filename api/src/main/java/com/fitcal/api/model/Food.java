package com.fitcal.api.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Food {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String image;

    @Column(nullable = false)
    private String brand;

    @Column(nullable = false)
    private double kcal;

    @Column(nullable = false)
    private double proteins;

    @Column(nullable = false)
    private double carbs;

    @Column(nullable = false)
    private double fats;

    // Una comida puede tener muchas FoodInstances
    @JsonIgnore
    @OneToMany(mappedBy = "food", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<FoodInstance> foodInstances = new ArrayList<>();
}
