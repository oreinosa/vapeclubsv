import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { User } from "../../shared/models/user";
import { DAO } from "../../shared/helpers/dao";
@Injectable({
  providedIn: "root"
})
export class UsersService extends DAO<User> {
  constructor(httpClient: HttpClient) {
    super(httpClient, "Usuario", "Usuarios", "admin/usuarios");
  }
}
