import { Day } from "./dayInterface";
import { ActivityLevel } from "./activityLevelInterface";
import { Goals } from "./goalsInterface";

export interface User {
    id?: number;
    email: string;
    googleId: string;
    name: string;
    photoUrl: string;
    weight: number;
    height: number;
    gender: string;
    birth_date: string;
    goal: string;
    activityLevel: string;
    calories: number;
    days: Day[];
}
