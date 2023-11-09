import {BasicEntity} from "./common";

export interface BikeForm {
  name: string;
  year: string;
  make: string;
  model: string;
  description: string;
  rating: string;
  price: string;
  quantity: number;
  category: string;
}

export interface Bike extends BasicEntity, BikeForm {}
