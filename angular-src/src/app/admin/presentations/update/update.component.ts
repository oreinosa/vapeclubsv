import { Component } from "@angular/core";
import { Presentation } from "../../../shared/models/presentation";
import { Router, ActivatedRoute } from "@angular/router";
import { PresentationsService } from "../presentations.service";
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
export class UpdateComponent extends Update<Presentation> {
  constructor(
    public service: PresentationsService,
    public notifications: NotificationsService,
    public router: Router,
    public route: ActivatedRoute
  ) {
    super(service, notifications, router, route);
  }
}
