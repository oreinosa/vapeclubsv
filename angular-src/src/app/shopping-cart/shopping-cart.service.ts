import { BehaviorSubject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { ShoppingCartItem } from './shopping-cart-item';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {
  private items$: BehaviorSubject<ShoppingCartItem[]> = new BehaviorSubject<ShoppingCartItem[]>([
    // {
    //   "amount": 1,
    //   "product": {
    //     "_id": "5b7770ed0d8a7705f48dc4b7",
    //     "imageURL": "productos/d86c1410-a282-11e8-88cc-69f7d226379e.jpeg",
    //     "name": "Pilsener (330ml)",
    //     "price": 1.5,
    //     "cost": 0.5,
    //     "category": {
    //       "_id": "5b7770b40d8a7705f48dc4b6",
    //       "name": "Cervezas nacionales"
    //     },
    //   }
    // }
  ]);

  constructor() { }

  getItems(): Observable<ShoppingCartItem[]> {
    return this.items$.asObservable();
  }

  addItem(item: ShoppingCartItem): void {
    const items = this.items$.getValue().slice();
    items.push(item);
    this.items$.next(items);
  }

  // removeProduct(product: Product): void {
  //   const products = this.products$.getValue().slice();
  //   products.push(product);
  //   this.products$.next(products);
  // }
}
