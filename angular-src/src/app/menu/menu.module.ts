import { NgModule } from "@angular/core";

import { MenuRoutingModule } from "./menu-routing.module";
import { MenuComponent } from "./menu.component";
import { FiltersComponent } from "./filters/filters.component";
import { CategoryOverviewComponent } from "./categories/category-overview/category-overview.component";
import { ProductsComponent } from "./products/products.component";
import { ProductOverviewComponent } from "./products/product-overview/product-overview.component";
import { ProductDetailComponent } from "./products/product-detail/product-detail.component";
import { SharedModule } from "../shared/shared.module";
import { CategoriesComponent } from "./categories/categories.component";
import { FeaturedComponent } from "./featured/featured.component";
import { FeaturedOverviewComponent } from "./featured/featured-overview/featured-overview.component";
import { CategoriesListComponent } from "./categories/categories-list/categories-list.component";
import { FeaturedListComponent } from "./featured/featured-list/featured-list.component";
import { ShoppingCartModule } from "../shopping-cart/shopping-cart.module";

@NgModule({
  imports: [SharedModule, ShoppingCartModule, MenuRoutingModule],
  declarations: [
    MenuComponent,
    FiltersComponent,
    CategoryOverviewComponent,
    ProductsComponent,
    ProductOverviewComponent,
    ProductDetailComponent,
    CategoriesComponent,
    FeaturedComponent,
    FeaturedOverviewComponent,
    CategoriesListComponent,
    FeaturedListComponent
  ]
})
export class MenuModule {}
