import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { MenuComponent } from "./menu.component";
import { ProductsComponent } from "./products/products.component";

const routes: Routes = [
  { path: "menu", redirectTo: "menu/todos" },
  { path: "menu/:category", component: MenuComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MenuRoutingModule {}
