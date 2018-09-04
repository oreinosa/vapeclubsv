import { OnInit, OnDestroy } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { map, filter, tap, switchMap, takeUntil } from "rxjs/operators";
import { Subject } from "rxjs";
import { NgForm } from "@angular/forms";
import { NotificationsService } from "../../notifications/notifications.service";
import { HttpErrorResponse } from "@angular/common/http";
import { DAO } from "./dao";

export class Update<T> implements OnInit, OnDestroy {
  private ngUnsubscribe = new Subject();
  object: T;
  _id: string;
  constructor(
    public service: DAO<T>,
    public notifications: NotificationsService,
    public router: Router,
    public route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.paramMap
      .pipe(
        map(params => params.get("_id")),
        tap(_id => {
          this._id = _id;
          if (_id === null || !(_id as string)) {
            this.router.navigate(["../"], { relativeTo: this.route });
          }
        }),
        filter(_id => !!_id),
        switchMap(
          _id =>
            this.service.isObjectSelected()
              ? this.service.getSelectedObject()
              : this.service.one(_id)
        ),
        takeUntil(this.ngUnsubscribe)
        // tap(object => console.log(object))
      )
      .subscribe(object => (this.object = object));
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  onSubmit(form: NgForm) {
    const object: T = form.value;
    this.service.update(this._id, object).subscribe(
      (editedObject: T) => {
        this.notifications.show(
          `${this.service.className} actualizado`,
          this.service.collectionName,
          "success"
        );
        this.router.navigate(["../../"], { relativeTo: this.route });
      },
      (e: HttpErrorResponse) => {
        this.notifications.show(e.error, this.service.collectionName, "danger");
        form.resetForm(object);
      }
    );
  }
}
