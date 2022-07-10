import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class General {
  unMapppedPhones: UnMapppedPhones[];
  brands: Brands[];
  phones: Phones[];
  filteredPhones: Phones[];
}
export class UnMapppedPhones {
  id: number;
  title: string;
  link: string;
  website: string;
  price: number;
  lastUpdatedDate: string;
  websiteId: number;
  variantId: any;
  isSelected: boolean;
  variant: any;
}
export class Brands {
  id: number;
  name: string;
  brandPhones: any[];
  phones: any[];
}
export class Phones {
  id: number;
  brandId: number;
  title: string;
  ram: string;
  storage: string;
  displaySize: string;
  batterySize: string;
  thumbnail: string;
  releaseDate: string;
  dimension: string;
  os: string;
  url: string;
  resolution: string;
  chipset: string;
  batteryType: string;
  photosUrl: string;
  brand: any;
  phonePhotoes: any[];
  phoneSpecs: any;
  variants: Variants[]=[];
  startAddVariant: boolean = false;
}
export class Variants {
  allProducts: any[];
  color: string;
  id: number;
  phoneId: number;
  size: string;
}

export class MapRequest{
  phones :number[];
  variantId :number;
}