import { Component, OnInit } from "@angular/core";
import { List } from "../../shared/helpers/list";
import { Product } from "../../shared/models/product";
import { ProductsService } from "./products.service";
import { Router } from "@angular/router";
import { switchMap, takeUntil, tap, map, startWith } from "rxjs/operators";
import { CategoriesService } from "../categories/categories.service";
import { Category } from "../../shared/models/category";
import { FormControl } from "@angular/forms";

@Component({
  selector: "app-products",
  templateUrl: "./products.component.html",
  styleUrls: ["./products.component.scss", "../../shared/styles/crud-list.scss"]
})
export class ProductsComponent extends List<Product> implements OnInit {
  categories: Category[];
  categoryCtrl = new FormControl("all");
  constructor(
    public service: ProductsService,
    public router: Router,
    private categoriesService: CategoriesService
  ) {
    super(service, router, [
      "id",
      "name",
      "category",
      "price",
      "cost",
      "imageURL",
      "actions"
    ]);
  }

  ngOnInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;

    this.service
      .all()
      .pipe(
        switchMap(() => this.categoriesService.all()),
        tap(categories => {
          console.log(categories);
          this.categories = categories;
        }),
        switchMap(() => this.service.objects),
        takeUntil(this.ngUnsubscribe),
        tap(products => {
          console.log(`${this.service.collectionName} : `, products);
          this.objects = products;
          this.dataSource.data = this.filterByCategory(this.categoryCtrl.value);
        }),
        switchMap(() => this.categoryCtrl.valueChanges),
        takeUntil(this.ngUnsubscribe),
        tap(categoryId => {
          if (categoryId === "all") {
            this.displayedColumns = [
              // "id",
              "name",
              "category",
              "price",
              "cost",
              "imageURL",
              "actions"
            ];
          } else {
            this.displayedColumns = [
              // "id",
              "name",
              "price",
              "cost",
              "imageURL",
              "actions"
            ];
          }
        })
      )
      .subscribe(
        (categoryId: string) =>
          (this.dataSource.data = this.filterByCategory(categoryId))
      );
  }

  filterByCategory(id: string) {
    // console.log(id);
    // if (!this.objects) {
    //   return [];
    // }
    if (id === "all") {
      return this.objects.slice();
    }
    return this.objects
      .slice()
      .filter(_product => _product.category._id === id);
  }
}
