import { Component, OnInit } from '@angular/core';
import { FlavorsService } from '../admin/flavors/flavors.service';
import { CategoriesService } from '../admin/categories/categories.service';
import { Flavor } from '../shared/models/flavor';
import { Category } from '../shared/models/category';
import { Observable } from 'rxjs';
import { tap, switchMap, map } from 'rxjs/operators';

interface Catalog {
  flavors?: Flavor[];
  category?: Category;
}

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss']
})
export class CatalogComponent implements OnInit {
  flavors: Flavor[];
  categories: Category[];
  catalog: Catalog[];

  constructor(
    private flavorsService: FlavorsService,
    private categoriesService: CategoriesService
  ) { }

  ngOnInit() {
    // this.categories = this.categoriesService.allPublic();
    // this.flavors = this.flavorsService.allPublic();
    this.flavorsService.allPublic().pipe(
      tap(flavors => console.log(flavors)),
      tap(flavors => this.flavors = flavors),
      switchMap(() => this.categoriesService.allPublic()),
      tap(categories => console.log(categories)),
      tap(categories => this.categories = categories),
      map(categories => {
        let catalog: Catalog[] = [];
        categories.forEach(category => {
          // check if category already exists
          const categoryFlag = catalog.findIndex(catalog => catalog.category.id == category.id) > 0;
          // if it doesn't exist
          if (!categoryFlag) {
            // generate catalog row
            const catalogItem: Catalog = {
              // filter flavors by this specific category
              flavors: this.flavors.filter(flavor => flavor.category.id == category.id),
              // add category to get name and id
              category
            };
            // push the catalog row to the array
            catalog.push(catalogItem);
          }
        });
        return catalog;
      })
    )
      .subscribe(catalog => this.catalog = catalog);
  }

}
