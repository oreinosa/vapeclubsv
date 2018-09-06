import { FlavorsService } from "../flavors.service";
import { Router, ActivatedRoute } from "@angular/router";
import { NotificationsService } from "../../../notifications/notifications.service";
import { Component, ViewChild, } from "@angular/core";
import { Flavor } from "../../../shared/models/flavor";
import { Create } from "../../../shared/helpers/create";
import { Observable } from "rxjs";
import { Category } from "../../../shared/models/category";
import { CategoriesService } from "../../categories/categories.service";
import { NgForm } from "@angular/forms";
import { UploadComponent } from "../../../upload/upload.component";
import { HttpErrorResponse } from "@angular/common/http";
@Component({
  selector: "app-create",
  templateUrl: "./create.component.html",
  styleUrls: [
    "./create.component.scss",
    "../../../shared/styles/crud-create.scss"
  ]
})
export class CreateComponent extends Create<Flavor> {
  @ViewChild(UploadComponent)
  upload: UploadComponent;
  object = new Flavor();
  categories: Observable<Category[]>;
  constructor(
    public flavorsService: FlavorsService,
    public router: Router,
    public route: ActivatedRoute,
    public notifications: NotificationsService,
    public categoriesService: CategoriesService
  ) {
    super(flavorsService, notifications, router, route);
    this.categories = this.categoriesService.all('id, name');
  }

  onSubmit(form: NgForm) {
    // console.log(form.value);
    this.upload
      .onSubmit(this.flavorsService.apiRoute)
      .subscribe(
        (imageURL: string) => {
          // console.log(imageURL);
          // Image uploaded
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

  compareCategoryFn(a: Category, b: Category) {
    // console.log(a, b);
    if (a && b) {
      return a.id == b.id;
    }
    return false;
  }
}
