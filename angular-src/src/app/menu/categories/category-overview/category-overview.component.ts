import { capitalize } from "./../../../shared/helpers/methods";
import { Input } from "@angular/core";
import { Category } from "./../../../shared/models/category";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-menu-category-overview",
  templateUrl: "./category-overview.component.html",
  styleUrls: ["./category-overview.component.scss"]
})
export class CategoryOverviewComponent implements OnInit {
  @Input()
  category: Category;
  @Input()
  onlyName = false;
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
