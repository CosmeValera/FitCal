import { Day } from "./dayInterface";

export interface User {
    id?: number;
    email: string;
    googleId: string;
    name: string;
    photoUrl: string;
    weight: number;
    height: number;
    gender: string;
    birth_date: Date;
    goal: string;
    activityLevel: string;
    calories: number;
    days: Day[];
}
