import { FlavorsService } from "../flavors.service";
import { Router, ActivatedRoute } from "@angular/router";
import { NotificationsService } from "../../../notifications/notifications.service";
import { Component, } from "@angular/core";
import { Flavor } from "../../../shared/models/flavor";
import { Create } from "../../../shared/helpers/create";
import { Observable } from "rxjs";
import { Category } from "../../../shared/models/category";
import { CategoriesService } from "../../categories/categories.service";
@Component({
  selector: "app-create",
  templateUrl: "./create.component.html",
  styleUrls: [
    "./create.component.scss",
    "../../../shared/styles/crud-create.scss"
  ]
})
export class CreateComponent extends Create<Flavor> {
  object = new Flavor();
  categories: Observable<Category[]>;
  constructor(
    public flavorsService: FlavorsService,
    public router: Router,
    public route: ActivatedRoute,
    public notifications: NotificationsService,
    public categoriesService: CategoriesService
  ) {
    super(flavorsService, notifications, router, route);
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
