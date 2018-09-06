import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { AppComponent } from "./app.component";

import { AppRoutingModule } from "./app-routing.module";

import { HttpClientModule } from "@angular/common/http";

import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { CoreModule } from "./core/core.module";
import { NotificationsModule } from "./notifications/notifications.module";

import { AuthModule } from "./auth/auth.module";
import { AuthService } from "./auth/auth.service";
import { AdminGuard } from "./auth/admin.guard";
import { AuthGuard } from "./auth/auth.guard";

import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { JwtModule } from "@auth0/angular-jwt";


export function tokenGetter() {
  const token = localStorage.getItem("token");
  // console.log(token);
  return token;
}

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        whitelistedDomains: ['vapeclub.sv'],
      }
    }),
    NotificationsModule,
    CoreModule,
    AuthModule,
    AppRoutingModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  declarations: [AppComponent],
  bootstrap: [AppComponent],
  providers: [AuthService, AuthGuard, AdminGuard]
})
export class AppModule { }
