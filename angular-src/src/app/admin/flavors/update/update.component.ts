import { Component } from "@angular/core";
import { Flavor } from "../../../shared/models/flavor";
import { Router, ActivatedRoute } from "@angular/router";
import { FlavorsService } from "../flavors.service";
import { NotificationsService } from "../../../notifications/notifications.service";
import { Update } from "../../../shared/helpers/update";
import { CategoriesService } from "../../categories/categories.service";
import { Observable } from "rxjs";
import { Category } from "../../../shared/models/category";

@Component({
  selector: "app-update",
  templateUrl: "./update.component.html",
  styleUrls: [
    "./update.component.scss",
    "../../../shared/styles/crud-update.scss"
  ]
})
export class UpdateComponent extends Update<Flavor> {
  categories: Observable<Category[]>;
  constructor(
    public service: FlavorsService,
    public notifications: NotificationsService,
    public router: Router,
    public route: ActivatedRoute,
    public categoriesService: CategoriesService
  ) {
    super(service, notifications, router, route);
    this.categories = this.categoriesService.all('id, name');
  }
  compareRoleFn(a: Category, b: Category) {
    // console.log(a, b);
    if(a && b){
      return a.id == b.id;
    }
    return false;
  }
}
