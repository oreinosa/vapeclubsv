import { Component, ViewChild } from "@angular/core";
import { Flavor } from "../../../shared/models/flavor";
import { Router, ActivatedRoute } from "@angular/router";
import { FlavorsService } from "../flavors.service";
import { NotificationsService } from "../../../notifications/notifications.service";
import { Update } from "../../../shared/helpers/update";
import { CategoriesService } from "../../categories/categories.service";
import { Observable } from "rxjs";
import { Category } from "../../../shared/models/category";
import { NgForm } from "@angular/forms";
import { HttpErrorResponse } from "@angular/common/http";
import { UploadComponent } from "../../../upload/upload.component";

@Component({
  selector: "app-update",
  templateUrl: "./update.component.html",
  styleUrls: [
    "./update.component.scss",
    "../../../shared/styles/crud-update.scss"
  ]
})
export class UpdateComponent extends Update<Flavor> {
  @ViewChild(UploadComponent)
  upload: UploadComponent;
  categories: Observable<Category[]>;
  constructor(
    public service: FlavorsService,
    public notifications: NotificationsService,
    public router: Router,
    public route: ActivatedRoute,
    public categoriesService: CategoriesService
  ) {
    super(service, notifications, router, route);
    this.categories = this.categoriesService.all('id, name');
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

  compareCategoryFn(a: Category, b: Category) {
    // console.log(a, b);
    if(a && b){
      return a.id == b.id;
    }
    return false;
  }
  
}
