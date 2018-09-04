import { Product } from './../../../shared/models/product';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-menu-featured-overview',
  templateUrl: './featured-overview.component.html',
  styleUrls: ['./featured-overview.component.scss']
})
export class FeaturedOverviewComponent implements OnInit {
  @Input() product: Product;
  constructor() { }

  ngOnInit() {
  }

}
