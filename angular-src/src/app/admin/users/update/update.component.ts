import { Component } from "@angular/core";
import { User } from "../../../shared/models/user";
import { Router, ActivatedRoute } from "@angular/router";
import { UsersService } from "../users.service";
import { NotificationsService } from "../../../notifications/notifications.service";
import { Update } from "../../../shared/helpers/update";
import { Role } from "../../../shared/models/role";
import { RolesService } from "../../roles/roles.service";
import { Observable } from "rxjs";

@Component({
  selector: "app-update",
  templateUrl: "./update.component.html",
  styleUrls: [
    "./update.component.scss",
    "../../../shared/styles/crud-update.scss"
  ]
})
export class UpdateComponent extends Update<User> {
  // roles: Role[] = [{ id: 1, name: "Cliente" }, { id: 3, name: "Admin" }];
  roles: Observable<Role[]>;

  constructor(
    public service: UsersService,
    public notifications: NotificationsService,
    public router: Router,
    public route: ActivatedRoute,
    public rolesService: RolesService
  ) {
    super(service, notifications, router, route);
    this.roles = this.rolesService.all("id, name");
  }

  compareRoleFn(a: Role, b: Role) {
    // console.log(a, b);
    if(a && b){
      return a.id == b.id;
    }
    return false;
  }
}
