import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-admin",
  templateUrl: "./admin.component.html",
  styleUrls: ["./admin.component.scss"]
})
export class AdminComponent implements OnInit {
  links: any[];
  constructor() { }

  ngOnInit() {
    this.links = [
      { label: "Usuarios", route: "usuarios", icon: "people" },
      { label: "Categorías", route: "categorias", icon: "category" },
      { label: "Productos", route: "productos", icon: "fastfood" },
      { label: "Combos", route: "combos", icon: "restaurant_menu" },
    ];
  }
}
