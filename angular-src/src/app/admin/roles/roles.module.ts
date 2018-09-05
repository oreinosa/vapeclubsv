import { SharedModule } from "../../shared/shared.module";
import { NgModule } from "@angular/core";

import { RolesRoutingModule } from "./roles-routing.module";
import { RolesComponent } from "./roles.component";
import { CreateComponent } from "./create/create.component";
import { DeleteComponent } from "./delete/delete.component";
import { UpdateComponent } from "./update/update.component";
import { UploadModule } from "../../upload/upload.module";

@NgModule({
  imports: [SharedModule, UploadModule, RolesRoutingModule],
  declarations: [
    RolesComponent,
    CreateComponent,
    DeleteComponent,
    UpdateComponent
  ]
})
export class RolesModule {}
