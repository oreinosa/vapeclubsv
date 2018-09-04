import { BehaviorSubject, Observable } from "rxjs";
import { map, tap } from "rxjs/operators";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../environments/environment";

export abstract class DAO<T> {
  private $api: string = environment.api;

  private selectedProductSubject = new BehaviorSubject<T>(null);
  public objects = new BehaviorSubject<T[]>([]);

  constructor(
    private http: HttpClient,
    public className: string,
    public collectionName: string,
    public apiRoute: string
  ) {
    this.$api += apiRoute + "/";
  }

  get api(): string {
    return this.$api;
  }
  // set api(api: string) {
  //   this.$api = api;
  // }
  getSelectedObject(): Observable<T> {
    return this.selectedProductSubject.asObservable();
  }

  setSelectedObject(object: T): void {
    return this.selectedProductSubject.next(object);
  }

  isObjectSelected(): boolean {
    return !!this.selectedProductSubject.getValue();
  }

  all() {
    return this.http.get<any>(this.$api).pipe(
      map(res => {
        return res.data as T[];
      }),
      tap(objects => {
        this.objects.next(objects);
      })
    );
  }

  one(_id: string) {
    return this.http.get<any>(this.$api + _id).pipe(
      map(res => {
        return res.data as T;
      })
    );
  }

  create(newObject: T) {
    return this.http.post<any>(this.$api, newObject).pipe(
      map(res => {
        return res.data as T;
      }),
      tap(addedProduct => {
        const objects = this.objects.getValue().slice();
        objects.push(addedProduct);
        this.objects.next(objects);
      })
    );
  }

  update(_id: string, object: T) {
    return this.http.put<any>(this.$api + _id, object).pipe(
      map(res => {
        return res.data as T;
      }),
      tap(editedProduct => {
        const objects = this.objects.getValue().slice();
        const index = objects.findIndex(
          _object => _object["_id"] === editedProduct["_id"]
        );
        objects[index] = editedProduct;
        this.objects.next(objects);
      })
    );
  }

  delete(_id: string) {
    return this.http.delete<any>(this.api + _id).pipe(
      tap(() => {
        const objects = this.objects.getValue().slice();
        const index = objects.findIndex(_object => _object["_id"] === _id);
        objects.splice(index, 1);
        this.objects.next(objects);
      })
    );
  }
}