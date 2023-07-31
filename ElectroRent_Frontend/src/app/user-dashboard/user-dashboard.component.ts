import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { MyauthService } from '../myauth.service';
import { PdfService } from '../services/pdf.service';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit {
   user:any;
   orderHistory:any;
   userId:number=0
  admin: boolean;
  details:any

   constructor(
    private http: HttpClient,
    private router: Router,
    private ngxServices: NgxUiLoaderService,
    private myauth: MyauthService,
   private pdfService: PdfService
  ) {}
   ngOnInit(){
    if(!this.myauth.getUserStatus()){
      this.router.navigate(['/login']);
      return;
    }
    this.myauth.isAdmin.subscribe((isAdmin)=>{
      this.admin = isAdmin
 })
    this.userId = this.myauth.getUserId();
    this.http
    .get(`http://localhost:8080/user/getUserbyid/${this.userId}`)
    .subscribe(
      (response) => {
        console.log("respomse",response);
        
        this.user = response;
        this.http
        .get(`http://localhost:8080/bill/orderHistory/${this.user[0].email}`)
        .subscribe(
          (response) => {
            this.orderHistory = response;
            console.log(this.orderHistory);
          },
          (error) => {
            console.error(error);
          }
        );
      },
      (error) => {
        console.error(error);
      }
    );

    this.http
    .get("http://localhost:8080/dashboard/details")
    .subscribe(
      (response) => {
        this.details = response;
        //console.log(this.orderHistory);
      },
      (error) => {
        console.error(error);
      }
    );
  

}
       
   }

