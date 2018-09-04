import { UploadComponent } from "../../../upload/upload.component";
import { map } from "rxjs/operators";
import { Router, ActivatedRoute } from "@angular/router";
import { Component, OnInit, ViewChild } from "@angular/core";
import { CategoriesService } from "../../categories/categories.service";
import { ProductsService } from "../products.service";
import { NotificationsService } from "../../../notifications/notifications.service";
import { Product } from "../../../shared/models/product";
import { Category } from "../../../shared/models/category";
import { Create } from "../../../shared/helpers/create";
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
export class CreateComponent extends Create<Product> implements OnInit {
  @ViewChild(UploadComponent)
  upload: UploadComponent;
  product = new Product();
  categories: Category[];
  constructor(
    public productsService: ProductsService,
    public router: Router,
    public route: ActivatedRoute,
    public notifications: NotificationsService,
    private categoriesService: CategoriesService
  ) {
    super(productsService, notifications, router, route);
  }

  ngOnInit() {
    this.categoriesService
      .all()
      .pipe(
        // tslint:disable-next-line:arrow-return-shorthand
        map(categories =>
          categories.map(category => {
            return { name: category.name, _id: category._id } as Category;
          })
        )
      )
      .subscribe((categories: Category[]) => (this.categories = categories));
  }

  onSubmit(form: NgForm) {
    // console.log(form.value);
    this.upload
      .onSubmit(this.productsService.apiRoute)
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
        }
      );
  }
}
