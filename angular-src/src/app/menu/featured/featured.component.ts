import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../../shared/models/product';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu-featured',
  templateUrl: './featured.component.html',
  styleUrls: ['./featured.component.scss']
})
export class FeaturedComponent implements OnInit {
  featured: Product[] = [
    {
      "_id": "5b7770ed0d8a7705f48dc4b7",
      "imageURL": "productos/d86c1410-a282-11e8-88cc-69f7d226379e.jpeg",
      "name": "Pilsener (330ml)",
      "price": 1.5,
      "cost": 0.5,
      "category": {
        "_id": "5b7770b40d8a7705f48dc4b6",
        "name": "Cervezas nacionales"
      },
      discount: 0.5
    },
    {
      "_id": "5b7771210d8a7705f48dc4bd",
      "imageURL": "productos/f784e4d0-a282-11e8-88cc-69f7d226379e.jpeg",
      "name": "Golden (330ml)",
      "price": 1.5,
      "cost": 0.4,
      "category": {
        "_id": "5b7770b40d8a7705f48dc4b6",
        "name": "Cervezas nacionales"
      },
      discount: 0.5
    }
  ];
  @Input() listView = false;
  constructor(
    private router: Router
  ) { }

  ngOnInit() {
  }
  onNavigate(categoryName: string) {
    let dashesCategory = categoryName.trim().replace(/\s+/g, "-").toLowerCase();
    this.router.navigate(['menu', dashesCategory])
  }

}
