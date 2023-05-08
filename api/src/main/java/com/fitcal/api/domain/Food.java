package com.fitcal.api.domain;

import jakarta.persistence.*;

import java.util.Objects;

@Entity
@Table
public class Food {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column
    private String name;
    @Column
    private int kcal;
    @Column
    private int proteins;
    @Column
    private int carbs;
    @Column
    private int fats;


}
