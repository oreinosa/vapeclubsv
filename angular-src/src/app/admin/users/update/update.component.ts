import { Component } from "@angular/core";
import { User } from "../../../shared/models/user";
import { Router, ActivatedRoute } from "@angular/router";
import { UsersService } from "../users.service";
import { NotificationsService } from "../../../notifications/notifications.service";
import { Update } from "../../../shared/helpers/update";

@Component({
  selector: "app-update",
  templateUrl: "./update.component.html",
  styleUrls: [
    "./update.component.scss",
    "../../../shared/styles/crud-update.scss"
  ]
})
export class UpdateComponent extends Update<User> {
  roles = ["Cliente", "Admin"];
  constructor(
    public service: UsersService,
    public notifications: NotificationsService,
    public router: Router,
    public route: ActivatedRoute
  ) {
    super(service, notifications, router, route);
  }
}
