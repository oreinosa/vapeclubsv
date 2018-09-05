import { Component, OnInit } from "@angular/core";
import { List } from "../../shared/helpers/list";
import { Flavor } from "../../shared/models/flavor";
import { FlavorsService } from "./flavors.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-flavors",
  templateUrl: "./flavors.component.html",
  styleUrls: [
    "./flavors.component.scss",
    "../../shared/styles/crud-list.scss"
  ]
})
export class FlavorsComponent extends List<Flavor> {
  constructor(
    public service: FlavorsService,
    public router: Router,
  ) {
    super(
      service,
      router,
      ["id", "name","description","imageURL","category", "actions"]
    );
  }
}
