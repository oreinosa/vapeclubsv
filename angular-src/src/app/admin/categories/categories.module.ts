import { SharedModule } from "../../shared/shared.module";
import { NgModule } from "@angular/core";

import { CategoriesRoutingModule } from "./categories-routing.module";
import { CategoriesComponent } from "./categories.component";
import { CreateComponent } from "./create/create.component";
import { DeleteComponent } from "./delete/delete.component";
import { UpdateComponent } from "./update/update.component";
import { UploadModule } from "../../upload/upload.module";

@NgModule({
  imports: [SharedModule, UploadModule, CategoriesRoutingModule],
  declarations: [
    CategoriesComponent,
    CreateComponent,
    DeleteComponent,
    UpdateComponent
  ]
})
export class CategoriesModule {}
