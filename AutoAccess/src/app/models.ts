// export interface nonAuthUser{
//     username: string;
//     email: string;
//     password: string;
//   }
export interface NonAuthUser {
  username: string;
  email: string;
  password: string;
  passwordConfirmation?: string;
}

export interface Car {
  id: number;
  name: string;
  model: string;
  price: number;
  description: string;
  image: string;
  category: number;
  liked?: boolean;
}