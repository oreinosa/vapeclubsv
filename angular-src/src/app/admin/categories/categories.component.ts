import { Component, OnInit } from "@angular/core";
import { List } from "../../shared/helpers/list";
import { Category } from "../../shared/models/category";
import { CategoriesService } from "./categories.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-categories",
  templateUrl: "./categories.component.html",
  styleUrls: [
    "./categories.component.scss",
    "../../shared/styles/crud-list.scss"
  ]
})
export class CategoriesComponent extends List<Category> {
  constructor(
    public service: CategoriesService,
    public router: Router,
  ) {
    super(
      service,
      router,
      ["id", "name", "description", "imageURL", "actions"]
    );
  }
}
