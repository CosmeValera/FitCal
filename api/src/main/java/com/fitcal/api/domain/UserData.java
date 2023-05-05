package com.fitcal.api.domain;

import jakarta.persistence.*;

import java.util.Objects;

@Entity
public class UserData {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    @OneToOne
    @JoinColumn(name = "user_id")
    private User user;
    private int steps;
    private int weight;
    private int height;
    private char gender;
    private Goals goal;

    public UserData() {
    }

    public UserData(Long id, User user, int steps, int weight, int height, char gender, Goals goal) {
        this.id = id;
        this.user = user;
        this.steps = steps;
        this.weight = weight;
        this.height = height;
        this.gender = gender;
        this.goal = goal;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public int getSteps() {
        return steps;
    }

    public void setSteps(int steps) {
        this.steps = steps;
    }

    public int getWeight() {
        return weight;
    }

    public void setWeight(int weight) {
        this.weight = weight;
    }

    public int getHeight() {
        return height;
    }

    public void setHeight(int height) {
        this.height = height;
    }

    public char getGender() {
        return gender;
    }

    public void setGender(char gender) {
        this.gender = gender;
    }

    public Goals getGoal() {
        return goal;
    }

    public void setGoal(Goals goal) {
        this.goal = goal;
    }

    @Override
    public String toString() {
        return "UserData{" +
                "id=" + id +
                ", user=" + user +
                ", steps=" + steps +
                ", weight=" + weight +
                ", height=" + height +
                ", gender=" + gender +
                ", goal=" + goal +
                '}';
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        UserData userData = (UserData) o;
        return steps == userData.steps && weight == userData.weight && height == userData.height && gender == userData.gender && Objects.equals(id, userData.id) && Objects.equals(user, userData.user) && goal == userData.goal;
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, user, steps, weight, height, gender, goal);
    }
}
