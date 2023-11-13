import {Bike, BikeForm} from "./models/bike";

export enum Page {
  NONE = 'none',
  SEARCH_BIKES = 'search-bikes',
  ADD_BIKE = 'add-bike',
  VIEW_BIKE = 'view-bike',
  EDIT_BIKE = 'edit-bike',
  EDIT_GALLERY = 'edit-gallery'
}

export const Languages = {
  en: 'English',
  es: 'Spanish'
};

export const EMPTY_BIKE_FORM: BikeForm = {
  name: '',
  year: '',
  make: '',
  model: '',
  description: '',
  rating: '',
  price: '',
  quantity: 0,
  category: '',
  images: []
};

export const EMPTY_BIKE: Bike = {
  id: 0,
  ...EMPTY_BIKE_FORM
}
