import { Foundation } from "./foundation";

export interface Animal {
  id: number;
  name: string; 
  type: string; 
  age: string; 
  description: string;
  image: string;
  state?: string; 
  tag?: string; 
  fundacionId?: number;
} 

export interface AnimalData {
  id: number;
  name: string;
  type: string;
  state?: string;
  tag?: string;
  age: string;
  description: string;
  image: string;
  fundacionId: number;
  // Datos adicionales que se cargarían para el modal
  breed?: string;
  gender?: string;
  size?: string;
  color?: string;
  personality?: string[];
  healthStatus?: string;
  vaccinated?: boolean;
  sterilized?: boolean;
  dewormed?: boolean;
  specialNeeds?: boolean;
  goodWith?: string[];
  notGoodWith?: string[];
  adoptionRequirements?: string[];
  story?: string;
  images?: string[];
  createdAt?: string;
  foundation?: Foundation;
}
