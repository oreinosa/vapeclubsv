import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Category } from "../../shared/models/category";
import { DAO } from "../../shared/helpers/dao";
@Injectable({
  providedIn: "root"
})
export class CategoriesService extends DAO<Category> {
  constructor(httpClient: HttpClient) {
    super(httpClient, "Categoría", "Categorías", "admin/categorias");
  }
}
