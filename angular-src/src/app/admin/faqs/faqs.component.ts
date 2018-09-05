import { Component, OnInit } from "@angular/core";
import { List } from "../../shared/helpers/list";
import { FAQ } from "../../shared/models/faq";
import { FAQsService } from "./faqs.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-faqs",
  templateUrl: "./faqs.component.html",
  styleUrls: [
    "./faqs.component.scss",
    "../../shared/styles/crud-list.scss"
  ]
})
export class FAQsComponent extends List<FAQ> {
  constructor(
    public service: FAQsService,
    public router: Router,
  ) {
    super(
      service,
      router,
      ["id", "question", "answer","actions"]
    );
  }
}
