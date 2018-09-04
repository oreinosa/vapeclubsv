import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { ShoppingCartRoutingModule } from './shopping-cart-routing.module';
import { ShoppingCartComponent } from './shopping-cart.component';
import { OverviewComponent } from './../shopping-cart/overview/overview.component';
import { MatCardModule, MatButtonModule, MatInputModule, MatListModule, MatTableModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatListModule,
    MatTableModule,
    ShoppingCartRoutingModule
  ],
  declarations: [ShoppingCartComponent, OverviewComponent],
  exports: [OverviewComponent]
})
export class ShoppingCartModule { }
