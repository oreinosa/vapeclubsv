import { AdminComponent } from "./admin.component";
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

const routes: Routes = [
  {
    path: "",
    component: AdminComponent,
    children: [
      {
        path: "usuarios",
        loadChildren: "./users/users.module#UsersModule"
      },
      {
        path: "categorias",
        loadChildren: "./categories/categories.module#CategoriesModule"
      },
      {
        path: "productos",
        loadChildren: "./products/products.module#ProductsModule"
      },
      { path: "", pathMatch: "full", redirectTo: "usuarios" }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {}
