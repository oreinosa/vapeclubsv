import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { NicotineAmount } from "../../shared/models/nicotine-amount";
import { DAO } from "../../shared/helpers/dao";
@Injectable({
  providedIn: "root"
})
export class NicotineAmountsService extends DAO<NicotineAmount> {
  constructor(httpClient: HttpClient) {
    super(httpClient, "Cantidad de nicotina", "Cantidades de nicotina", "cantidades-nicotina");
  }
}
