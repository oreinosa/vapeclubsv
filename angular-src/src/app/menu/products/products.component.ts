import { Component, Input } from "@angular/core";
import { Product } from "../../shared/models/product";

@Component({
  selector: "app-menu-products",
  templateUrl: "./products.component.html",
  styleUrls: ["./products.component.scss"]
})
export class ProductsComponent {
  @Input()
  products: Product[];
  @Input()
  byCategory: false;
  constructor() {}
}
