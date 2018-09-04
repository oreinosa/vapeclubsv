import { Category } from "./../../shared/models/category";
import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "app-menu-categories",
  templateUrl: "./categories.component.html",
  styleUrls: ["./categories.component.scss"]
})
export class CategoriesComponent implements OnInit {
  @Input()
  categories: Category[];
  @Input()
  onlyName = false;
  @Input()
  hideCategories = false;

  constructor() {}

  ngOnInit() {}

}
