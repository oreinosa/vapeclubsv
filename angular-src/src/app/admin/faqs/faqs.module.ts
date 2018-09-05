import { SharedModule } from "../../shared/shared.module";
import { NgModule } from "@angular/core";

import { FAQsRoutingModule } from "./faqs-routing.module";
import { FAQsComponent } from "./faqs.component";
import { CreateComponent } from "./create/create.component";
import { DeleteComponent } from "./delete/delete.component";
import { UpdateComponent } from "./update/update.component";
import { UploadModule } from "../../upload/upload.module";

@NgModule({
  imports: [SharedModule, UploadModule, FAQsRoutingModule],
  declarations: [
    FAQsComponent,
    CreateComponent,
    DeleteComponent,
    UpdateComponent
  ]
})
export class FAQsModule {}
