export interface User {
  username: boolean;
  password: string;
  email: string;
  birthday: Date;
  token: string;
}

export interface Credentials {
  username: string;
  password: string;
}
