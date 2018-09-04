import { environment } from './../../../environments/environment';
export class User {
  constructor(
    public _id?: number,
    public name?: string,
    // public username?: string,
    public email?: string,
    public phone?: number,
    public id_role?: number,
    public reg_date?: Date,
    // public password?: string,
  ) {}
}
