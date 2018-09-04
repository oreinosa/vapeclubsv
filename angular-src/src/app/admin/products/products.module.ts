import { SharedModule } from "../../shared/shared.module";
import { NgModule } from "@angular/core";

import { ProductsRoutingModule } from "./products-routing.module";
import { ProductsComponent } from "./products.component";
import { CreateComponent } from "./create/create.component";
import { DeleteComponent } from "./delete/delete.component";
import { UpdateComponent } from "./update/update.component";
import { UploadModule } from "../../upload/upload.module";

@NgModule({
  imports: [SharedModule, UploadModule, ProductsRoutingModule],
  declarations: [
    ProductsComponent,
    CreateComponent,
    DeleteComponent,
    UpdateComponent
  ]
})
export class ProductsModule {}
