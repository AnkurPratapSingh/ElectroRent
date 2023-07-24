import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Emitters } from '../emitters/emitters';
import { MyauthService } from '../myauth.service';


interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
}

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  products: Product[] = [];
  authenticated :boolean=false;
  constructor(private http: HttpClient, private router:Router,private ngxServices:NgxUiLoaderService, private myauth:MyauthService ) {}


  ngOnInit() {
    // Replace this with actual data fetched from the backend

  //   Emitters.authEmitter.subscribe((auth:boolean,msg:any)=>{
  //     this.authenticated = auth;
  // })
  // if(this.authenticated == false)
  // {
  //   this.router.navigate(['/login']);
  // }
 
  // this.myauth.isLoggedIn.subscribe((isLoggedIn) => {
  //   this.authenticated = isLoggedIn;
  //   // Do whatever you want with the new isLoggedIn value
  // });

  if(!this.myauth.getUserStatus()){
    this.router.navigate(['/login']);
    return;
  }
  // if(!this.authenticated){
  //   this.router.navigate(['/login']);
  //   return;
  //   } 
    this.http.get<Product[]>('http://localhost:8080/category/get',{withCredentials:true})
    .subscribe(
      (data) => {
        console.log(data)
        this.products= data;
      },
      (error) => {
        console.error('Error fetching products:', error);
      }
    )

    

    // this.products = [
    //   { id: 1, name: 'Product 1', description: 'Description of Product 1', price: 10.99 },
    //   { id: 2, name: 'Product 2', description: 'Description of Product 2', price: 24.99 },
    //   // Add more products here...
    // ];
  }
  goToCategory(categoryId: number) { 
    console.log(categoryId);
    
    this.router.navigate(['/category', categoryId]);
    // Replace '/category' with the actual route path for the category page.
    // For example, if your category page route is '/category/:id', use ['/category', categoryId]
  }



}

