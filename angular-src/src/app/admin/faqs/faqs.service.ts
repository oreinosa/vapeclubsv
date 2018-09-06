import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { FAQ } from "../../shared/models/faq";
import { DAO } from "../../shared/helpers/dao";
@Injectable({
  providedIn: "root"
})
export class FAQsService extends DAO<FAQ> {
  constructor(httpClient: HttpClient) {
    super(httpClient, "FAQ", "FAQs", "faqs");
  }
}
