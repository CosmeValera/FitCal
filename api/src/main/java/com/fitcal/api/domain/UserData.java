package com.fitcal.api.domain;

import com.fitcal.api.user.model.User;
import jakarta.persistence.*;

import java.time.LocalDate;

@Entity
@Table
public class UserData {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long user_id;
    @OneToOne
    @JoinColumn(name = "user_id")
    private User user;
    @Column
    private String name;
    @Column
    private String surnames;
    @Column
    private double weight;
    @Column
    private int height;
    @Column
    private char gender;
    @Column
    private LocalDate birth_date;
    @Column
    private Goals goal;
    @Column
    private ActivityLevel activityLevel;

    public UserData() {
    }

    public UserData(Long user_id, User user, String name, String surnames, double weight, int height, char gender, LocalDate birth_date, Goals goal, ActivityLevel activityLevel) {
        this.user_id = user_id;
        this.user = user;
        this.name = name;
        this.surnames = surnames;
        this.weight = weight;
        this.height = height;
        this.gender = gender;
        this.birth_date = birth_date;
        this.goal = goal;
        this.activityLevel = activityLevel;
    }

    public Long getUser_id() {
        return user_id;
    }

    public void setUser_id(Long user_id) {
        this.user_id = user_id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getSurnames() {
        return surnames;
    }

    public void setSurnames(String surnames) {
        this.surnames = surnames;
    }

    public double getWeight() {
        return weight;
    }

    public void setWeight(double weight) {
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

    public LocalDate getBirth_date() {
        return birth_date;
    }

    public void setBirth_date(LocalDate birth_date) {
        this.birth_date = birth_date;
    }

    public Goals getGoal() {
        return goal;
    }

    public void setGoal(Goals goal) {
        this.goal = goal;
    }

    public ActivityLevel getActivityLevel() {
        return activityLevel;
    }

    public void setActivityLevel(ActivityLevel activityLevel) {
        this.activityLevel = activityLevel;
    }
}
