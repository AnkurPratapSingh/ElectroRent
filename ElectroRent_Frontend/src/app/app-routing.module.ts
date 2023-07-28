import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { ProductComponent } from './product/product.component';
import { CategoryComponent } from './category/category.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { PdfViewerComponent } from './pdf-viewer/pdf-viewer.component';
import { RentNowComponent } from './rent-now/rent-now.component';
import { CarouselSlideDirective } from 'ngx-owl-carousel-o';
import { CartComponent } from './cart/cart.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';

const routes: Routes = [
  {path:'', component:HomeComponent},
  {path:'signup', component:SignupComponent},
  {path:'login', component:LoginComponent},
  {path:'forgetPassword',component:ForgetPasswordComponent},
  {path:'category/get',component:CategoryComponent},
  {path :'category/:id',component:ProductComponent},
  {path:'contactus',component:ContactUsComponent},
  {path:'pdfview',component:PdfViewerComponent},
  {path:'rentnow/:id',component:RentNowComponent},
  {path:'cartitems',component:CartComponent},
  {path:'aboutus',component:AboutusComponent},
  {path:'dashboard',component:UserDashboardComponent}
  
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
