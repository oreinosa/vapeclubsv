import { Component, OnInit } from "@angular/core";
import { Observable, of } from "rxjs";
import { Presentation } from "../../shared/models/presentation";
import { Category } from "../../shared/models/category";
import { PresentationsService } from "../../admin/presentations/presentations.service";
import { CategoriesService } from "../../admin/categories/categories.service";
import { tap } from "rxjs/operators";

@Component({
  selector: "app-welcome",
  templateUrl: "./welcome.component.html",
  styleUrls: ["./welcome.component.scss"]
})
export class WelcomeComponent implements OnInit {
  $presentations: Observable<Presentation[]>;
  $categories: Observable<Category[]>;


  constructor(
    private presentationsService: PresentationsService,
    private categoriesService: CategoriesService
  ) { }

  ngOnInit() {
    this.$presentations = this.presentationsService.allPublic().pipe(tap(data => console.log(data)));
    this.$categories = this.categoriesService.allPublic().pipe(tap(data => console.log(data)));

    // this.$presentations = of([
    //   {
    //     name: "30ml",
    //     description:
    //       "Nuestra presentación standard ha evolucionado y ahora viene en un frasco plástico que incluye gotero con punta fina y proteccion para niños.",
    //     price: 14,
    //     imageURL: "assets/catalogo_1.jpg",
    //     hot: true
    //   },
    //   {
    //     name: "40ml",
    //     description:
    //       "Práctica y portatil presentación en botes Chubby Gorilla 100% originales. Tu mejor opción si cuentas con poco espacio para transportarlo.",
    //     price: 15,
    //     imageURL: "assets/catalogo_2.jpg"
    //   },
    //   {
    //     name: "60ml",
    //     description:
    //       "¿30ml no son suficientes para tu gusto?  Nuestra presentación de 60ml en botes Chubby Gorilla es entonces tu mejor opción!",
    //     price: 15,
    //     imageURL: "assets/catalogo_3.jpg"
    //   }
    // ]);
    // this.$categories = of([
    //   {
    //     name: "Mentolados",
    //     description:
    //       "Deliciosas combinaciones mentoladas: Gravity, Kiwiberry Sweet, Dragon's Soul, Strawberry Ice, Kringle, Extreme Ice.",
    //     imageURL: "assets/flavor_1.jpg"
    //   },
    //   {
    //     name: "Frutales",
    //     description:
    //       "Las mejores combinaciones frutales que puedas encontrar: Tropical Sin, Typhoon, Mega Melon, Sunset, Kiwi Cherry Cream, Lava Shot, Berry Mixed.",
    //     imageURL: "assets/flavor_2.jpg"
    //   },
    //   {
    //     name: "Reposteria",
    //     description:
    //       "Sabores de reposterías y cereales también tenemos disponibles: Cheesecake Redemption, Cookies and Cream, Strawberry Cream, Berry Crunchy.",
    //     imageURL: "assets/flavor_3.jpg"
    //   }
    // ]);
  }
}
