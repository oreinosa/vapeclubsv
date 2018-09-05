interface Role {
  id?: number;
  name?: string;
}
export class User {
  constructor(
    public id?: number,
    public name?: string,
    public email?: string,
    public phone?: number,
    public role?: Role,
    public reg_date?: Date,
  ) {}
}
