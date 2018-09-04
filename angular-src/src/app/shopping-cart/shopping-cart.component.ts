import { Subject } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { ShoppingCartItem } from './shopping-cart-item';
import { MatTableDataSource } from '@angular/material';
import { ShoppingCartService } from './shopping-cart.service';
import { tap, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit {
  private ngUnsubscribe = new Subject();
  items: ShoppingCartItem[];
  dataSource = new MatTableDataSource<ShoppingCartItem>();
  displayedColumns = ["name", "amount", "subtotal"];

  constructor(
    private service: ShoppingCartService
  ) { }

  ngOnInit() {
    this.service.getItems().pipe(
      tap(items => console.log(items)),
      tap(items => this.items = items),
      takeUntil(this.ngUnsubscribe)
    )
      .subscribe(items => this.dataSource.data = items);
  }

  ngOnDestroy(){
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  getTotal(): number {
    let total = 0;
    for (let item of this.items) {
      total += (item.product.price * item.amount);
    }
    return total;
  }
}
