import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Role } from "../../shared/models/role";
import { DAO } from "../../shared/helpers/dao";
@Injectable({
  providedIn: "root"
})
export class RolesService extends DAO<Role> {
  constructor(httpClient: HttpClient) {
    super(httpClient, "Rol", "Roles", "roles");
  }
}
