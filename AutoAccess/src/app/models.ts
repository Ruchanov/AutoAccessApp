export interface NonAuthUser {
  username: string;
  email: string;
  password: string;
  passwordConfirmation?: string;
}

// export interface Car {
//   id: number;
//   name: string;
//   model: string;
//   price: number;
//   description: string;
//   image: string;
//   category: number;
//   liked?: boolean;
// }
export interface Car {
  id: number;
  name: string;
  marka: string;
  model: string;
  year: number;
  price: number;
  mileage: number;
  body_type: string;
  transmission: string;
  image: string;
  description: string;
  liked?: boolean;
  phoneNumber: string;
}
export interface CarFormData {
  marka: string;
  model: string;
  year: number | null;
  price: number | null;
  mileage: number | null;
  body_type: string;
  transmission: string;
  description: string;
  image: File | null;
  phoneNumber: string;
}
