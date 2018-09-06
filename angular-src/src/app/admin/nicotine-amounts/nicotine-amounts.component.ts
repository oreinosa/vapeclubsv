import { Component, OnInit } from "@angular/core";
import { List } from "../../shared/helpers/list";
import { NicotineAmount } from "../../shared/models/nicotine-amount";
import { NicotineAmountsService } from "./nicotine-amounts.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-nicotine-amounts",
  templateUrl: "./nicotine-amounts.component.html",
  styleUrls: [
    "./nicotine-amounts.component.scss",
    "../../shared/styles/crud-list.scss"
  ]
})
export class NicotineAmountsComponent extends List<NicotineAmount> {
  constructor(
    public service: NicotineAmountsService,
    public router: Router,
  ) {
    super(
      service,
      router,
      ["id", "name", "actions"]
    );
  }
}
