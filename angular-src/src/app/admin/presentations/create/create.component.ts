import { PresentationsService } from "../presentations.service";
import { Router, ActivatedRoute } from "@angular/router";
import { NotificationsService } from "../../../notifications/notifications.service";
import { Component,  } from "@angular/core";
import { Presentation } from "../../../shared/models/presentation";
import { Create } from "../../../shared/helpers/create";
@Component({
  selector: "app-create",
  templateUrl: "./create.component.html",
  styleUrls: [
    "./create.component.scss",
    "../../../shared/styles/crud-create.scss"
  ]
})
export class CreateComponent extends Create<Presentation> {
  object = new Presentation();
  constructor(
    public presentationsService: PresentationsService,
    public router: Router,
    public route: ActivatedRoute,
    public notifications: NotificationsService
  ) {
    super(presentationsService, notifications, router, route);
  }
}
