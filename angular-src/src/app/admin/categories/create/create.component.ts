import { CategoriesService } from "../categories.service";
import { Router, ActivatedRoute } from "@angular/router";
import { NotificationsService } from "../../../notifications/notifications.service";
import { Component, ViewChild } from "@angular/core";
import { Category } from "../../../shared/models/category";
import { Create } from "../../../shared/helpers/create";
import { UploadComponent } from "../../../upload/upload.component";
import { HttpErrorResponse } from "@angular/common/http";
import { NgForm } from "@angular/forms";
@Component({
  selector: "app-create",
  templateUrl: "./create.component.html",
  styleUrls: [
    "./create.component.scss",
    "../../../shared/styles/crud-create.scss"
  ]
})
export class CreateComponent extends Create<Category> {
  @ViewChild(UploadComponent)
  upload: UploadComponent;
  category = new Category();
  constructor(
    public categoriesService: CategoriesService,
    public router: Router,
    public route: ActivatedRoute,
    public notifications: NotificationsService
  ) {
    super(categoriesService, notifications, router, route);
  }

  onSubmit(form: NgForm) {
    // console.log(form.value);
    this.upload
      .onSubmit(this.categoriesService.apiRoute)
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
