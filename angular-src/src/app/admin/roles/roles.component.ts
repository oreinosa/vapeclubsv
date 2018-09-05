import { Component, OnInit } from "@angular/core";
import { List } from "../../shared/helpers/list";
import { Role } from "../../shared/models/role";
import { RolesService } from "./roles.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-roles",
  templateUrl: "./roles.component.html",
  styleUrls: [
    "./roles.component.scss",
    "../../shared/styles/crud-list.scss"
  ]
})
export class RolesComponent extends List<Role> {
  constructor(
    public service: RolesService,
    public router: Router,
  ) {
    super(
      service,
      router,
      ["id", "name", "description", "actions"]
    );
  }
}
