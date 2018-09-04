import { Component, OnInit, Input } from '@angular/core';
import { Category } from '../../../shared/models/category';

@Component({
  selector: 'app-welcome-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
  @Input() category: Category;

  constructor() { }

  ngOnInit() {
  }

}
