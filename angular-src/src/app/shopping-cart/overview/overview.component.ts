import { tap } from 'rxjs/operators';
import { ShoppingCartService } from './../shopping-cart.service';
import { ShoppingCartItem } from './../shopping-cart-item';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-shopping-cart-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit {
  items: ShoppingCartItem[];
  dataSource = new MatTableDataSource<ShoppingCartItem>([]);
  displayedColumns = ["name", "amount", "subtotal"];

  constructor(
    private service: ShoppingCartService
  ) { }

  ngOnInit() {
    this.service.getItems().pipe(
      tap(items => console.log(items)),
      tap(items => this.items = items)
    )
      .subscribe(items => this.dataSource.data = items);
  }

  getTotal(): number {
    let total = 0;
    for (let item of this.items) {
      total += (item.product.price * item.amount);
    }
    return total;
  }

}
