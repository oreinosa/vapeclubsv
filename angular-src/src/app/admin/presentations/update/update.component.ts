import { Component, ViewChild } from "@angular/core";
import { Presentation } from "../../../shared/models/presentation";
import { Router, ActivatedRoute } from "@angular/router";
import { PresentationsService } from "../presentations.service";
import { NotificationsService } from "../../../notifications/notifications.service";
import { Update } from "../../../shared/helpers/update";
import { NgForm } from "@angular/forms";
import { UploadComponent } from "../../../upload/upload.component";
import { HttpErrorResponse } from "@angular/common/http";

@Component({
  selector: "app-update",
  templateUrl: "./update.component.html",
  styleUrls: [
    "./update.component.scss",
    "../../../shared/styles/crud-update.scss"
  ]
})
export class UpdateComponent extends Update<Presentation> {
  @ViewChild(UploadComponent)
  upload: UploadComponent;
  constructor(
    public service: PresentationsService,
    public notifications: NotificationsService,
    public router: Router,
    public route: ActivatedRoute
  ) {
    super(service, notifications, router, route);
  }

  onSubmit(form: NgForm) {
    this.upload.onSubmit(this.service.apiRoute).subscribe(
      (imageURL: string) => {
        console.log(imageURL);
        if (imageURL) {
          form.controls.imageURL.setValue(imageURL);
        } else {
          form.controls.imageURL.disable();
        }
        console.log(form.value);
        // form.reset(form.value);
        super.onSubmit(form);
      },
      (error: HttpErrorResponse) => {
        console.log(error);
        form.reset(form.value);
      }
    );
  }
}
