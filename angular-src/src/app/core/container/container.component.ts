import { AuthService } from "../../auth/auth.service";
import { LogoutComponent } from "../../auth/logout/logout.component";
import { Router } from "@angular/router";
import { Component } from "@angular/core";
import { BreakpointObserver } from "@angular/cdk/layout";
import { Observable } from "rxjs";
import { map, tap, take, filter } from "rxjs/operators";
import { MatDialog } from "@angular/material";
import { LoginComponent } from "../../auth/login/login.component";
import { RegisterComponent } from "../../auth/register/register.component";
import { User } from "../../shared/models/user";

const BREAKPOINTS = {
  xsmall: "(max-width: 599px)",
  small: "(min-width: 600px) and (max-width: 799px)",
  medium: "(min-width: 800px) and (max-width: 999px)",
  large: "(min-width: 1000px) and (max-width: 1279px)",
  xlarge: "(min-width: 1280px)"
};

@Component({
  selector: "app-container",
  templateUrl: "./container.component.html",
  styleUrls: ["./container.component.scss"]
})
export class ContainerComponent {
  appName = "Vape Club SV";
  user: User;
  links: any[];
  actions: any[];

  overlay$: Observable<string> = this.breakpointObserver
    .observe([
      BREAKPOINTS.xsmall,
      BREAKPOINTS.small,
      BREAKPOINTS.medium,
      BREAKPOINTS.large,
      BREAKPOINTS.xlarge
    ])
    .pipe(
      // tap(result => console.log(result)),
      map(result => {
        let layout: string;
        if (this.checkBreakpoint(BREAKPOINTS.xlarge)) {
          layout = "xl";
        } else if (this.checkBreakpoint(BREAKPOINTS.large)) {
          layout = "lg";
        } else if (this.checkBreakpoint(BREAKPOINTS.medium)) {
          layout = "md";
        } else if (this.checkBreakpoint(BREAKPOINTS.small)) {
          layout = "sm";
        } else if (this.checkBreakpoint(BREAKPOINTS.xsmall)) {
          layout = "xs";
        }
        return layout;
      })
      // , tap(layout => console.log(layout))
    );

  constructor(
    private breakpointObserver: BreakpointObserver,
    private dialog: MatDialog,
    private router: Router,
    private auth: AuthService
  ) {
    this.auth.linksSubject.subscribe(links => this.links = links);
    this.auth.actionsSubject.subscribe(actions => this.actions = actions);

    this.auth.user
      .subscribe(user => (this.user = user));
  }

  private checkBreakpoint(breakpoint: string): boolean {
    return this.breakpointObserver.isMatched(breakpoint);
  }

  onAction(action: string) {
    let component;
    switch (action) {
      case "ingresar":
        component = LoginComponent;
        break;
      case "registrarse":
        component = RegisterComponent;
        break;
      case "cerrar-sesion":
        component = LogoutComponent;
        break;
      default:
        this.router.navigate([action]);
        return;
    }
    const event = this.dialog.open(component, {
      width: "350px"
    });
    // event.afterClosed().subscribe(result => {
    //   if (result) {
    //     let role = "not-logged-in";
    //     if (result.user) {
    //       role = result.user.role;
    //     }
    //     this.updateRouting(role);
    //   }
    // });
  }
}
