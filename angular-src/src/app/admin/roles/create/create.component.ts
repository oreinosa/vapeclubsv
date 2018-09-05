import { RolesService } from "../roles.service";
import { Router, ActivatedRoute } from "@angular/router";
import { NotificationsService } from "../../../notifications/notifications.service";
import { Component,  } from "@angular/core";
import { Role } from "../../../shared/models/role";
import { Create } from "../../../shared/helpers/create";
@Component({
  selector: "app-create",
  templateUrl: "./create.component.html",
  styleUrls: [
    "./create.component.scss",
    "../../../shared/styles/crud-create.scss"
  ]
})
export class CreateComponent extends Create<Role> {
  object = new Role();
  constructor(
    public rolesService: RolesService,
    public router: Router,
    public route: ActivatedRoute,
    public notifications: NotificationsService
  ) {
    super(rolesService, notifications, router, route);
  }
}
