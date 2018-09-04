import { Component, OnInit, Input } from "@angular/core";
import { Category } from "../../../shared/models/category";
import { Router } from "@angular/router";

@Component({
  selector: "app-menu-categories-list",
  templateUrl: "./categories-list.component.html",
  styleUrls: ["./categories-list.component.scss"]
})
export class CategoriesListComponent implements OnInit {
  @Input()
  categories: Category[];
  constructor(private router: Router) {}

  ngOnInit() {}

  onNavigate(categoryName: string) {
    const dashesCategory = categoryName
      .trim()
      .replace(/\s+/g, "-")
      .toLowerCase();
    this.router.navigate(["menu", dashesCategory]);
  }
}
