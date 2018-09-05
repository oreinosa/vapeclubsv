import { Component } from "@angular/core";
import { FAQ } from "../../../shared/models/faq";
import { Router, ActivatedRoute } from "@angular/router";
import { FAQsService } from "../faqs.service";
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
export class UpdateComponent extends Update<FAQ> {
  constructor(
    public service: FAQsService,
    public notifications: NotificationsService,
    public router: Router,
    public route: ActivatedRoute
  ) {
    super(service, notifications, router, route);
  }
}
