import { BehaviorSubject, Observable } from "rxjs";
import { map, tap } from "rxjs/operators";
import { HttpClient, HttpParams } from "@angular/common/http";
import { environment } from "../../../environments/environment";

export abstract class DAO<T> {
  private $adminApi: string = environment.api + 'admin/';
  private $publicApi: string = environment.api + 'public/';

  private selectedProductSubject = new BehaviorSubject<T>(null);
  public objects = new BehaviorSubject<T[]>([]);

  constructor(
    private http: HttpClient,
    public className: string,
    public collectionName: string,
    public apiRoute: string
  ) {
    this.$adminApi += apiRoute;
    this.$publicApi += apiRoute;
  }

  get api(): string {
    return this.$adminApi;
  }
  // set api(api: string) {
  //   this.$adminApi = api;
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

  all(properties?: string) {
    let params = {};
    if (properties) {
      // console.log(properties);
      params = { 'properties': properties };
      // console.log(params);
    }
    return this.http.get<any>(this.$adminApi, { params }).pipe(
      map(res => {
        return res.data as T[];
      }),
      tap(objects => {
        this.objects.next(objects);
      })
    );
  }

  allPublic() {
    return this.http.get<any>(this.$publicApi).pipe(
      map(res => {
        return res.data as T[];
      }),
      tap(objects => {
        this.objects.next(objects);
      })
    );
  }

  one(id: number) {
    return this.http.get<any>(this.$adminApi + `/${id}`).pipe(
      map(res => {
        return res.data as T;
      })
    );
  }

  create(object: T) {
    return this.http.post<any>(this.$adminApi, object).pipe(
      map(res => {
        const newObject = { ...res.data as any, ...object as any };
        return newObject as T;
      }),
      tap((newObject) => {
        const objects = this.objects.getValue().slice();
        objects.push(newObject);
        this.objects.next(objects);
      })
    );
  }

  update(id: number, object: T) {
    return this.http.put<any>(this.$adminApi + `/${id}`, object).pipe(
      map(res => {
        // console.log(res);
        if (res.flag) {
          return object as T;
        }
        return null;
      }),
      tap(editedObject => {
        console.log(!!editedObject);
        if (editedObject) {
          const objects = this.objects.getValue().slice();
          const index = objects.findIndex(
            _object => _object["id"] == id
          );
          objects[index] = { ...objects[index] as any, ...editedObject as any };
          this.objects.next(objects);
        }
      })
    );
  }

  delete(id: number) {
    return this.http.delete<any>(this.api + `/${id}`).pipe(
      tap(() => {
        const objects = this.objects.getValue().slice();
        const index = objects.findIndex(_object => _object["id"] == id);
        objects.splice(index, 1);
        this.objects.next(objects);
      })
    );
  }
}