package com.fitcal.api.domain;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

import java.util.Objects;

@Entity
public class Food {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private int kcal;
    private int proteins;
    private int carbs;
    private int fats;

    public Food() {}
    public Food(Long id, int kcal, int proteins, int carbs, int fats) {
        this.id = id;
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

    public int getKcal() {
        return kcal;
    }

    public void setKcal(int kcal) {
        this.kcal = kcal;
    }

    public int getProteins() {
        return proteins;
    }

    public void setProteins(int proteins) {
        this.proteins = proteins;
    }

    public int getCarbs() {
        return carbs;
    }

    public void setCarbs(int carbs) {
        this.carbs = carbs;
    }

    public int getFats() {
        return fats;
    }

    public void setFats(int fats) {
        this.fats = fats;
    }

    @Override
    public String toString() {
        return "Food{" +
                "id=" + id +
                ", kcal=" + kcal +
                ", proteins=" + proteins +
                ", carbs=" + carbs +
                ", fats=" + fats +
                '}';
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Food food = (Food) o;
        return kcal == food.kcal && proteins == food.proteins && carbs == food.carbs && fats == food.fats && Objects.equals(id, food.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, kcal, proteins, carbs, fats);
    }
}
