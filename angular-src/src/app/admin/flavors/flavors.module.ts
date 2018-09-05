import { SharedModule } from "../../shared/shared.module";
import { NgModule } from "@angular/core";

import { FlavorsRoutingModule } from "./flavors-routing.module";
import { FlavorsComponent } from "./flavors.component";
import { CreateComponent } from "./create/create.component";
import { DeleteComponent } from "./delete/delete.component";
import { UpdateComponent } from "./update/update.component";
import { UploadModule } from "../../upload/upload.module";

@NgModule({
  imports: [SharedModule, UploadModule, FlavorsRoutingModule],
  declarations: [
    FlavorsComponent,
    CreateComponent,
    DeleteComponent,
    UpdateComponent
  ]
})
export class FlavorsModule {}
