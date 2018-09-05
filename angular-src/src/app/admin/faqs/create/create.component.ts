import { FAQsService } from "../faqs.service";
import { Router, ActivatedRoute } from "@angular/router";
import { NotificationsService } from "../../../notifications/notifications.service";
import { Component,  } from "@angular/core";
import { FAQ } from "../../../shared/models/faq";
import { Create } from "../../../shared/helpers/create";
@Component({
  selector: "app-create",
  templateUrl: "./create.component.html",
  styleUrls: [
    "./create.component.scss",
    "../../../shared/styles/crud-create.scss"
  ]
})
export class CreateComponent extends Create<FAQ> {
  faq = new FAQ();
  constructor(
    public faqsService: FAQsService,
    public router: Router,
    public route: ActivatedRoute,
    public notifications: NotificationsService
  ) {
    super(faqsService, notifications, router, route);
  }
}
