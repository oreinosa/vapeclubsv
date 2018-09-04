import { Component, OnInit, Input } from "@angular/core";
import { Product } from "../../../shared/models/product";
import { ShoppingCartService } from "../../../shopping-cart/shopping-cart.service";
import { ShoppingCartItem } from "../../../shopping-cart/shopping-cart-item";
import { NotificationsService } from "../../../notifications/notifications.service";

@Component({
  selector: "app-menu-product-overview",
  templateUrl: "./product-overview.component.html",
  styleUrls: ["./product-overview.component.scss"]
})
export class ProductOverviewComponent implements OnInit {
  @Input()
  product: Product;
  @Input()
  byCategory: false;

  amount = 0;
  constructor(
    private shoppingCartService: ShoppingCartService,
    private notifications: NotificationsService
  ) {}

  ngOnInit() {}

  addProduct() {
    const item: ShoppingCartItem = {
      product: this.product,
      amount: this.amount
    };
    this.shoppingCartService.addItem(item);
    this.notifications.show(
      `Se agregó ${item.amount}x ${item.product.name}`,
      "Carrito",
      "success"
    );
    this.amount = 0;
  }
}
