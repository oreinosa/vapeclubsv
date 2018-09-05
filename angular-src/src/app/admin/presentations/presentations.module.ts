import { SharedModule } from "../../shared/shared.module";
import { NgModule } from "@angular/core";

import { PresentationsRoutingModule } from "./presentations-routing.module";
import { PresentationsComponent } from "./presentations.component";
import { CreateComponent } from "./create/create.component";
import { DeleteComponent } from "./delete/delete.component";
import { UpdateComponent } from "./update/update.component";
import { UploadModule } from "../../upload/upload.module";

@NgModule({
  imports: [SharedModule, UploadModule, PresentationsRoutingModule],
  declarations: [
    PresentationsComponent,
    CreateComponent,
    DeleteComponent,
    UpdateComponent
  ]
})
export class PresentationsModule {}
