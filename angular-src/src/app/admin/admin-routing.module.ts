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
        path: "faqs",
        loadChildren: "./faqs/faqs.module#FAQsModule"
      },
      {
        path: "roles",
        loadChildren: "./roles/roles.module#RolesModule"
      },
      {
        path: "presentaciones",
        loadChildren: "./presentations/presentations.module#PresentationsModule"
      },
      {
        path: "sabores",
        loadChildren: "./flavors/flavors.module#FlavorsModule"
      },
      {
        path: "cantidades-nicotina",
        loadChildren: "./nicotine-amounts/nicotine-amounts.module#NicotineAmountsModule"
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
