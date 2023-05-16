package com.fitcal.api.food.model;

import jakarta.persistence.*;

@Entity
@Table
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

    public Food() {
    }

    public Food(Long id, String name, String image, String brand, double kcal, double proteins, double carbs, double fats) {
        this.id = id;
        this.name = name;
        this.image = image;
        this.brand = brand;
        this.kcal = kcal;
        this.proteins = proteins;
        this.carbs = carbs;
        this.fats = fats;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public String getBrand() {
        return brand;
    }

    public void setBrand(String brand) {
        this.brand = brand;
    }

    public double getKcal() {
        return kcal;
    }

    public void setKcal(double kcal) {
        this.kcal = kcal;
    }

    public double getProteins() {
        return proteins;
    }

    public void setProteins(double proteins) {
        this.proteins = proteins;
    }

    public double getCarbs() {
        return carbs;
    }

    public void setCarbs(double carbs) {
        this.carbs = carbs;
    }

    public double getFats() {
        return fats;
    }

    public void setFats(double fats) {
        this.fats = fats;
    }
}
