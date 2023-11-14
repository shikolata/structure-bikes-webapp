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
  price: undefined,
  quantity: undefined,
  category: '',
  images: []
};

export const EMPTY_BIKE: Bike = {
  id: 0,
  ...EMPTY_BIKE_FORM
}

export const BIKE_CATEGORIES: string[] = [
  'Cruiser',
  'Sportsbike/Superbike',
  'Touring',
  'Adventure/ADV',
  'Naked/Standard',
  'Dual-Sport',
  'Cafe Racer',
  'Chopper',
  'Scooter',
  'Electric',
  'Dirt Bike',
  'Trials Bike'
];

export const BIKE_MAKES: string[] = [
  "Honda",
  "Yamaha",
  "Suzuki",
  "Kawasaki",
  "Harley-Davidson",
  "Ducati",
  "BMW Motorrad",
  "Triumph",
  "KTM",
  "Aprilia",
  "Moto Guzzi",
  "Indian Motorcycle",
  "Royal Enfield",
  "Victory Motorcycles",
  "Husqvarna Motorcycles",
  "MV Agusta",
  "Buell",
  "Bimota",
  "Benelli",
  "Zero Motorcycles"
]
