import { Component, OnInit, OnDestroy } from "@angular/core";
import { CategoriesService } from "../admin/categories/categories.service";
import { Category } from "../shared/models/category";
import { tap, map, takeUntil, switchMap } from "rxjs/operators";
import { Product } from "../shared/models/product";
import { Subject } from "rxjs";
import { FormControl } from "@angular/forms";
import { MenuService } from "./menu.service";
import { ActivatedRoute } from "@angular/router";
import { capitalize } from "../shared/helpers/methods";

@Component({
  selector: "app-menu",
  templateUrl: "./menu.component.html",
  styleUrls: ["./menu.component.scss"]
})
export class MenuComponent implements OnInit, OnDestroy {
  private ngUnsubscribe = new Subject();
  category: string;
  allProducts: Product[];
  products: Product[];
  categories: Category[];
  searchCtrl = new FormControl();

  constructor(
    private menuService: MenuService,
    private categoriesService: CategoriesService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.categoriesService
      .all()
      .subscribe(categories => (this.categories = categories));

    this.route.paramMap
      .pipe(
        takeUntil(this.ngUnsubscribe),
        map(params => params.get("category")),
        tap(() => (this.products = this.allProducts = null)),
        map(category => this.prepareCategoryName(category)),
        tap(category => {
          console.log(category);
          this.category = category;
        }),
        switchMap(category => this.menuService.allByCategory(category)),
        tap(products => {
          console.log(products);
          this.allProducts = products;
        })
      )
      .subscribe(() => (this.products = this.allProducts));

    this.searchCtrl.valueChanges.subscribe(
      productName => (this.products = this.searchProduct(productName))
    );
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  prepareCategoryName(categoryName: string): string {
    if (categoryName !== "todos") {
      return capitalize(categoryName.replace(/-+/g, " "));
    }
    return "Todos los productos";
  }

  searchProduct(name: string): Product[] {
    if (name) {
      return this.allProducts
        .slice()
        .filter(product =>
          product.name.toLowerCase().includes(name.toLowerCase())
        );
    }
    return this.allProducts.slice();
  }
}
