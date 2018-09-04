import { CategoryComponent } from './welcome/category/category.component';
// import { ShoppingCartModule } from './../shopping-cart/shopping-cart.module';
import { NgModule } from "@angular/core";
import { SharedModule } from "../shared/shared.module";
import { ContainerComponent } from "./container/container.component";
import { MatToolbarModule, MatSidenavModule } from "@angular/material";
import { RouterModule } from "@angular/router";

import { AvatarComponent } from "./container/avatar/avatar.component";
import { FooterComponent } from "./container/footer/footer.component";
import { CoreRoutingModule } from "./core-routing.module";
import { NotFoundComponent } from "./not-found/not-found.component";
import { FaqComponent } from "./faq/faq.component";
import { ToolbarComponent } from "./container/toolbar/toolbar.component";
import { SidenavContentComponent } from "./container/sidenav-content/sidenav-content.component";
import { WelcomeComponent } from './welcome/welcome.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { PresentationComponent } from "./welcome/presentation/presentation.component";


@NgModule({
  imports: [
    SharedModule,
    RouterModule,
    MatToolbarModule,
    MatSidenavModule,
    // ShoppingCartModule,
    CoreRoutingModule
  ],
  exports: [ContainerComponent],
  declarations: [
    ContainerComponent,
    AvatarComponent,
    FooterComponent,
    NotFoundComponent,
    FaqComponent,
    ToolbarComponent,
    SidenavContentComponent,
    WelcomeComponent,
    CategoryComponent,
    PresentationComponent,
    ContactUsComponent
  ]
})
export class CoreModule { }
