import { NicotineAmountsService } from "../nicotine-amounts.service";
import { Router, ActivatedRoute } from "@angular/router";
import { NotificationsService } from "../../../notifications/notifications.service";
import { Component,  } from "@angular/core";
import { NicotineAmount } from "../../../shared/models/nicotine-amount";
import { Create } from "../../../shared/helpers/create";
@Component({
  selector: "app-create",
  templateUrl: "./create.component.html",
  styleUrls: [
    "./create.component.scss",
    "../../../shared/styles/crud-create.scss"
  ]
})
export class CreateComponent extends Create<NicotineAmount> {
  object = new NicotineAmount();
  constructor(
    public nicotineAmountsService: NicotineAmountsService,
    public router: Router,
    public route: ActivatedRoute,
    public notifications: NotificationsService
  ) {
    super(nicotineAmountsService, notifications, router, route);
  }
}
