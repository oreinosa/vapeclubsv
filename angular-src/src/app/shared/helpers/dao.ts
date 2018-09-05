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
    this.$api += apiRoute;
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

  one(id: number) {
    return this.http.get<any>(this.$api + `/${id}`).pipe(
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

  update(id: number, object: T) {
    return this.http.put<any>(this.$api + `/${id}`, object).pipe(
      map(res => {
        return res.data as T;
      }),
      tap(editedProduct => {
        const objects = this.objects.getValue().slice();
        const index = objects.findIndex(
          _object => _object["id"] === editedProduct["id"]
        );
        objects[index] = editedProduct;
        this.objects.next(objects);
      })
    );
  }

  delete(id: number) {
    return this.http.delete<any>(this.api + `/${id}`).pipe(
      tap(() => {
        const objects = this.objects.getValue().slice();
        const index = objects.findIndex(_object => _object["id"] === id);
        objects.splice(index, 1);
        this.objects.next(objects);
      })
    );
  }
}