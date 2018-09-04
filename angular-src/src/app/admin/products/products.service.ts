import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Product } from "../../shared/models/product";
import { DAO } from "../../shared/helpers/dao";
@Injectable({
  providedIn: "root"
})
export class ProductsService extends DAO<Product> {
  constructor(public httpClient: HttpClient) {
    super(httpClient, "Producto", "Productos", "productos");
  }
}
