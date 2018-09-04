import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { QuickActionsComponent } from "./quick-actions.component";
import {
  MatButtonModule,
  MatMenuModule,
  MatIconModule
} from "@angular/material";
import { ShoppingCartModule } from "../shopping-cart/shopping-cart.module";
import { ActionComponent } from "./action/action.component";
import { OverviewComponent } from "../shopping-cart/overview/overview.component";

@NgModule({
  imports: [
    CommonModule,
    ShoppingCartModule,
    MatButtonModule,
    MatMenuModule,
    MatIconModule
  ],
  declarations: [QuickActionsComponent, ActionComponent],
  exports: [QuickActionsComponent],
  entryComponents: [OverviewComponent]
})
export class QuickActionsModule {}
