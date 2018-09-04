import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { AppComponent } from "./app.component";

import { AppRoutingModule } from "./app-routing.module";

import { HttpClientModule } from "@angular/common/http";

import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { CoreModule } from "./core/core.module";
import { NotificationsModule } from "./notifications/notifications.module";
// import { ShoppingCartModule } from './shopping-cart/shopping-cart.module';
// import { QuickActionsModule } from "./quick-actions/quick-actions.module";

import { AuthModule } from "./auth/auth.module";
import { AuthService } from "./auth/auth.service";
import { AdminGuard } from "./auth/admin.guard";
import { AuthGuard } from "./auth/auth.guard";

import { JwtModule } from "@auth0/angular-jwt";
import { MenuModule } from "./menu/menu.module";
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

export function tokenGetter() {
  return localStorage.getItem("token");
}

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        whitelistedDomains: [
          "localhost:8080",
          "localhost",
          "127.0.0.1",
          "thenewfuturesv.com",
          "www.thenewfuturesv.com",
          "ubuntu"
        ]
      }
    }),
    BrowserAnimationsModule,
    NotificationsModule,
    CoreModule,
    AuthModule,
    MenuModule,
    // QuickActionsModule,
    // ShoppingCartModule,
    AppRoutingModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  declarations: [AppComponent],
  bootstrap: [AppComponent],
  providers: [AuthService, AuthGuard, AdminGuard]
})
export class AppModule {}
