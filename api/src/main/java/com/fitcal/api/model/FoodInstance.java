package com.fitcal.api.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table
@Data
@NoArgsConstructor
@AllArgsConstructor
public class FoodInstance {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Una FoodInstance puede tener una comida
    @ManyToOne
    @JoinColumn(name = "food_id")
    private Food food;
        
    @Column(nullable = false)
    private String mealType;// BREAKFAST, LUNCH, DINNER, SNACKS

    @Column
    private int grams;

    // Una FoodInstance esta en un dia
    @ManyToOne
    @JoinColumn(name = "day_id")
    private Day day;

}
