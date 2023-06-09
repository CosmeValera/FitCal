import { Day } from "./dayInterface";
import { Food } from "./foodInterface";

export interface FoodInstance {
    id?: number;
    food: Food;
    mealType: string;
    grams: number;
    day: Day;
}
