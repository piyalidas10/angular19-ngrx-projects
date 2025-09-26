export interface User {
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  state: string;
  pin: string;
  email: string;
  password: string;
}

export interface UserLogin {
  email: string;
  password: string;
}

export interface LoggedInUser {
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  state: string;
  pin: string;
  email: string; //new
}

export interface LoginToken {
  token: string;
  expiresInSeconds: number;
  user: LoggedInUser;
}
