import { User } from "./userInterface";

export interface WeightDay {
  id?: number;
  user: User;
  date: Date;
  weight: number;
}
