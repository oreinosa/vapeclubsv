import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, tap } from "rxjs/operators";
import { Product } from "../shared/models/product";
import { capitalize } from "../shared/helpers/methods";
import { Observable } from "rxjs";
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: "root"
})
export class MenuService {
  constructor(private httpClient: HttpClient) {}

  allByCategory(categoryName?: string): Observable<Product[]> {
    const query = categoryName === "Todos los productos"
      ? "productos"
      : `productos/categoria/${categoryName}`;
    return this.httpClient.get<any>(environment.api + query).pipe(
      map(res => {
        return res.data as Product[];
      })
    );
  }
}
