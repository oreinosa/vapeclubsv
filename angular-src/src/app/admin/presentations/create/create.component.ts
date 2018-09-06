import { PresentationsService } from "../presentations.service";
import { Router, ActivatedRoute } from "@angular/router";
import { NotificationsService } from "../../../notifications/notifications.service";
import { Component, ViewChild,  } from "@angular/core";
import { Presentation } from "../../../shared/models/presentation";
import { Create } from "../../../shared/helpers/create";
import { UploadComponent } from "../../../upload/upload.component";
import { NgForm } from "@angular/forms";
import { HttpErrorResponse } from "@angular/common/http";
@Component({
  selector: "app-create",
  templateUrl: "./create.component.html",
  styleUrls: [
    "./create.component.scss",
    "../../../shared/styles/crud-create.scss"
  ]
})
export class CreateComponent extends Create<Presentation> {
  @ViewChild(UploadComponent)
  upload: UploadComponent;
  object = new Presentation();
  constructor(
    public presentationsService: PresentationsService,
    public router: Router,
    public route: ActivatedRoute,
    public notifications: NotificationsService
  ) {
    super(presentationsService, notifications, router, route);
  }

  onSubmit(form: NgForm) {
    // console.log(form.value);
    this.upload
      .onSubmit(this.presentationsService.apiRoute)
      .subscribe(
        (imageURL: string) => {
          // console.log(imageURL);
          // this.product.imageURL = imageURL;
          const imageCtrl = form.controls.imageURL;
          imageCtrl.setValue(imageURL); // set imageURL input value to the resolt of the upload POST event
          // form.setValue({ ...form.value, "imageURL": res.data });
          // console.log(form.value);
          super.onSubmit(form);
        },
        (error: HttpErrorResponse) => {
          console.log(error);
          form.resetForm();
        }
      );
  }

}
