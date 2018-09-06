import { NicotineAmountsService } from "../nicotine-amounts.service";
import { Router, ActivatedRoute } from "@angular/router";
import { Component } from "@angular/core";
import { NotificationsService } from "../../../notifications/notifications.service";
import { Delete } from "../../../shared/helpers/delete";
import { NicotineAmount } from "../../../shared/models/nicotine-amount";

@Component({
  selector: "app-delete",
  templateUrl: "./delete.component.html",
  styleUrls: [
    "./delete.component.scss",
    "../../../shared/styles/crud-delete.scss"
  ]
})
export class DeleteComponent extends Delete<NicotineAmount> {
  constructor(
    public nicotineAmountsService: NicotineAmountsService,
    public notifications: NotificationsService,
    public router: Router,
    public route: ActivatedRoute
  ) {
    super(nicotineAmountsService, notifications, router, route);
  }
}
