import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms'; // Import the FormsModule

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import{NgxUiLoaderModule,NgxUiLoaderConfig,SPINNER,PB_DIRECTION} from 'ngx-ui-loader';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { ProductComponent } from './product/product.component';
import { CategoryComponent } from './category/category.component';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { PdfViewerComponent } from './pdf-viewer/pdf-viewer.component';
import { RentNowComponent } from './rent-now/rent-now.component';
import { CartComponent } from './cart/cart.component';
import { SharedService } from './services/shared.services';
import { FooterComponent } from './footer/footer.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { UserListComponent } from './user-list/user-list.component';



const NgxUiLoaderConfig: NgxUiLoaderConfig ={
   text:"Loading...",
   textColor:"#ffffff",
   textPosition:"center-center",
   pbColor:"green",
   bgsColor:"green",
   fgsColor:"green",
   fgsType:SPINNER.threeStrings,
   pbDirection:PB_DIRECTION.leftToRight,
   fgsSize:100,
   pbThickness:5


}
@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    LoginComponent,
    NavbarComponent,
    HomeComponent,
    ForgetPasswordComponent,
    ProductComponent,
    CategoryComponent,
    ContactUsComponent,
    PdfViewerComponent,
    RentNowComponent,
    CartComponent,
    FooterComponent,
    AboutusComponent,
    UserDashboardComponent,
    UserListComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule ,
    NgxUiLoaderModule.forRoot(NgxUiLoaderConfig),
    SlickCarouselModule,
    CarouselModule
  ],
 
  providers: [
    SharedService // Add the SharedService to the providers array
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
