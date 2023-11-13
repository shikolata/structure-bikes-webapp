import {BasicEntity, Image} from "./common";

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
  images?: Image[];
}

export interface Bike extends BasicEntity, BikeForm {}
