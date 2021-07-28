import { Role } from '../enums/users.enum';

export interface IUser {
  id: string;
  username: string;
  email: string;
  emailVerified: boolean;
  role: Role;
  createdAt: Date;
  updatedAt: Date;
}

export interface ICookiesUser {
  id: string;
  username: string;
  email: string;
  emailVerified: boolean;
  role: Role | null;
}
