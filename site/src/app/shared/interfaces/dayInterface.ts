import { FoodInstance } from "./foodInstanceInterface";
import { User } from "./userInterface";

export interface Day {
  id?: number;
  user: User;
  date: Date;
  foodInstances?: FoodInstance[];
}
