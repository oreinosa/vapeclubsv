import { Component, OnInit } from "@angular/core";
import { List } from "../../shared/helpers/list";
import { Presentation } from "../../shared/models/presentation";
import { PresentationsService } from "./presentations.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-presentations",
  templateUrl: "./presentations.component.html",
  styleUrls: [
    "./presentations.component.scss",
    "../../shared/styles/crud-list.scss"
  ]
})
export class PresentationsComponent extends List<Presentation> {
  constructor(
    public service: PresentationsService,
    public router: Router,
  ) {
    super(
      service,
      router,
      ["id", "name", "price","description", "actions"]
    );
  }
}
