import { Product } from "../shared/models/product";

export class ShoppingCartItem {
  constructor(
    public _id?: string,
    public amount?: number,
    public product?: Product
  ) { }
}
