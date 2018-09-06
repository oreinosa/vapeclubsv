import { Component } from "@angular/core";
import { NicotineAmount } from "../../../shared/models/nicotine-amount";
import { Router, ActivatedRoute } from "@angular/router";
import { NicotineAmountsService } from "../nicotine-amounts.service";
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
export class UpdateComponent extends Update<NicotineAmount> {
  constructor(
    public service: NicotineAmountsService,
    public notifications: NotificationsService,
    public router: Router,
    public route: ActivatedRoute
  ) {
    super(service, notifications, router, route);
  }
}
