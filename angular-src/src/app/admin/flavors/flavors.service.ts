import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Flavor } from "../../shared/models/flavor";
import { DAO } from "../../shared/helpers/dao";
@Injectable({
  providedIn: "root"
})
export class FlavorsService extends DAO<Flavor> {
  constructor(httpClient: HttpClient) {
    super(httpClient, "Sabor", "Sabores", "sabores");
  }
}
