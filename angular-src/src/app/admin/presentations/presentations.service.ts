import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Presentation } from "../../shared/models/presentation";
import { DAO } from "../../shared/helpers/dao";
@Injectable({
  providedIn: "root"
})
export class PresentationsService extends DAO<Presentation> {
  constructor(httpClient: HttpClient) {
    super(httpClient, "Presentación", "Presentaciones", "admin/presentaciones");
  }
}
