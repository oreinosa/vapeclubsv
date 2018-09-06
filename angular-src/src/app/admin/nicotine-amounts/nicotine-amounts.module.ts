import { SharedModule } from "../../shared/shared.module";
import { NgModule } from "@angular/core";

import { NicotineAmountsRoutingModule } from "./nicotine-amounts-routing.module";
import { NicotineAmountsComponent } from "./nicotine-amounts.component";
import { CreateComponent } from "./create/create.component";
import { DeleteComponent } from "./delete/delete.component";
import { UpdateComponent } from "./update/update.component";
import { UploadModule } from "../../upload/upload.module";

@NgModule({
  imports: [SharedModule, UploadModule, NicotineAmountsRoutingModule],
  declarations: [
    NicotineAmountsComponent,
    CreateComponent,
    DeleteComponent,
    UpdateComponent
  ]
})
export class NicotineAmountsModule {}
