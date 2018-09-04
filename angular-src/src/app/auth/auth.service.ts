import { Router } from "@angular/router";
import { BehaviorSubject, Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { User } from "../shared/models/user";
import { Login } from "../shared/models/login";
import { Register } from "../shared/models/register";
import { JwtHelperService } from "@auth0/angular-jwt";
import { map, tap } from "rxjs/operators";
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  private api = environment.api + "auth/";
  private userSubject: BehaviorSubject<User>;
  linksSubject: BehaviorSubject<any[]>;
  actionsSubject: BehaviorSubject<any[]>;
  token: string;

  constructor(
    private http: HttpClient,
    private jwtHelper: JwtHelperService,
    private router: Router
  ) {
    this.linksSubject = new BehaviorSubject([
      { label: "Bienvenidos", route: "", icon: "home" },
      { label: "Catálogo", route: "catalogo", icon: "bookmark" },
      { label: "Contacto", route: "contacto", icon: "contact_phone" },
      { label: "FAQ", route: "faq", icon: "question_answer" },
    ]);
    this.actionsSubject = new BehaviorSubject([
      { label: "Ingresar", name: "ingresar", icon: "person" },
      { label: "Registrarse", name: "registrarse", icon: "person_add" }
    ]);
    this.checkSession();
  }

  private checkSession() {
    let token: string = null,
      user: User = null;
    if (this.loggedIn()) {
      console.log("user is already logged in");
      token = localStorage.getItem("token");
      user = JSON.parse(localStorage.getItem("user")) as User;
    }
    this.token = token;
    this.userSubject = new BehaviorSubject<User>(user);
  }

  get user(): Observable<User> {
    return this.userSubject.asObservable();
  }

  loggedIn() {
    return !this.jwtHelper.isTokenExpired();
  }

  login(login: Login) {
    return this.http.post<any>(this.api + "login", login).pipe(
      tap(res => {
        if (res.data && res.token) {
          this.updateUserData(res.data as User, res.token as string);
        }
      }),
      map(res => {
        if (res.data) {
          return res.data as User;
        }
        return null;
      })
    );
  }

  register(register: Register) {
    return this.http.post<any>(this.api + "register", register).pipe(
      map(res => {
        if (res.data) {
          return res.data as User;
        }
        return res;
      })
    );
  }

  signOut() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    this.updateUserData(null, null);
    this.router.navigate([""]);
  }

  updateUserData(user: User, token: string) {
    console.log("Updated user : ", user);
    this.userSubject.next(user);
    this.token = token;
    if (user && token) {
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
    }
    this.updateRouting(user ? user.id_role : 0);
  }

  private updateRouting(id_role: number) {
    console.log("Updating routing for ", id_role);
    const links: any[] = [
      { label: "Bienvenidos", route: "", icon: "home" },
      { label: "Catálogo", route: "catalogo", icon: "bookmark" },
      { label: "Contacto", route: "contacto", icon: "contact_phone" },
      { label: "FAQ", route: "faq", icon: "question_answer" },
    ];
    const actions: any[] = [];
    switch (id_role) {
      case 3:
        links.push({
          label: "Admin",
          route: "admin",
          icon: "build",
          children: [
            { label: "Usuarios", route: "usuarios", icon: "people" },
            { label: "Categorías", route: "categorias", icon: "category" },
            { label: "Productos", route: "productos", icon: "fastfood" },
            { label: "Combos", route: "combos", icon: "restaurant_menu" }
          ]
        });
        links.push({
          label: "Órdenes",
          route: "ordenes",
          icon: "assignment_late"
        });
      // tslint:disable-next-line:no-switch-case-fall-through
      case 1:
        actions.push({ label: "Perfil", name: "perfil", icon: "person_pin" });
        break;
      default:
        actions.push(
          { label: "Ingresar", name: "ingresar", icon: "person" },
          { label: "Registrarse", name: "registrarse", icon: "person_add" }
        );
    }
    this.linksSubject.next(links);
    this.actionsSubject.next(actions);
  }
}
