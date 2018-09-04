import { Component, OnInit } from "@angular/core";
import { OverviewComponent } from "../shopping-cart/overview/overview.component";

@Component({
  selector: "app-quick-actions",
  templateUrl: "./quick-actions.component.html",
  styleUrls: ["./quick-actions.component.scss"]
})
export class QuickActionsComponent implements OnInit {
  actions = [
    {
      icon: "shopping_cart_",
      label: "Carrito",
      component: OverviewComponent,
      color: 'bg-primary'
    }
  ];
  constructor() {}

  ngOnInit() {}
}
