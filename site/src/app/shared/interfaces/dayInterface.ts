import { FoodInstance } from "./foodInstanceInterface";

export interface Day {
  id?: number;
  user_id: number;
  date: Date;
  foodInstances?: FoodInstance[];
}
