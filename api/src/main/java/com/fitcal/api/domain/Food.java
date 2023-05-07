package com.fitcal.api.domain;

import jakarta.persistence.*;

import java.util.Objects;

@Entity
public class Food {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
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
