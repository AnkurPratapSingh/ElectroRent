import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { MyauthService } from '../myauth.service';
import { PdfService } from '../services/pdf.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent {
   users:any;
   admin:boolean=false;
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

 }
 )
 this.getUsers();
    
   
    }
  getUsers(){
    this.http
    .get(`http://localhost:8080/user/get`)
    .subscribe(
      (response) => {
        console.log("respomse",response);
        
        this.users = response;
        
      
      },
      (error) => {
        console.error(error);
      }
    );
  }
    deleteUser(id: number){
      this.http
      .delete(`http://localhost:8080/user/deleteUser/${id}`)
      .subscribe(
        (response) => {
          console.log("res for delete",response);
          this.getUsers();
          
          
        
        },
        (error) => {
          console.error(error);
        }
      );
    }
  }
