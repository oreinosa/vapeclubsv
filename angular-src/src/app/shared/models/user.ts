import { environment } from './../../../environments/environment';
export class User {
  constructor(
    public _id?: string,
    public name?: string,
    public username?: string,
    public email?: string,
    public role?: string,
    public createdAt?: Date,
    public password?: string,
  ) {}
}
