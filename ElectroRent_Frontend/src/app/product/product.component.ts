import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';
import { MyauthService } from '../myauth.service';



interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
}

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})

export class ProductComponent implements OnInit {

    products: Product[] = [];
    admin:boolean =false;

   
    constructor(private myauth:MyauthService,private http: HttpClient, private router:Router,private ngxServices:NgxUiLoaderService ,private route: ActivatedRoute) {}

  
    ngOnInit() {
      // Replace this with actual data fetched from the backend
      // this.http.get<Product[]>('http://localhost:8080/category/get',{withCredentials:true})
      // .subscribe(
      //   (data) => {
      //     console.log(data)
      //     this.products= data;
      //   },
      //   (error) => {
      //     console.error('Error fetching products:', error);
      this.myauth.isAdmin.subscribe((isAdmin)=>{
        this.admin = isAdmin
   })
   
  
      //   }
      if(!this.myauth.getUserStatus()){
        this.router.navigate(['/login']);
        return;
      }
      this.route.params.subscribe(params => {
        const categoryId = +params['id'];
        // Fetch the category data based on the categoryId (Replace with your actual API call)
        this.http.get<Product[]>(`http://localhost:8080/product/getByCategory/${categoryId}`,{withCredentials:true})
        .subscribe(
          (data) => {
            console.log(data)
            this.products= data;
          },
          (error) => {
            console.error('Error fetching products:', error);
          }
        )
        
      });
    }
      

      

      // this.products = [
      //   { id: 1, name: 'Product 1', description: 'Description of Product 1', price: 10.99 },
      //   { id: 2, name: 'Product 2', description: 'Description of Product 2', price: 24.99 },
      //   // Add more products here...
      // ];
    
      fetchCategoryById(categoryId: number){
        // Replace this with actual API call to fetch category details by ID
        // For example, use the HttpClient to make a GET request to the backend
        // and return the category data.
        this.http.get<Product[]>('http://localhost:8080/category/getByCategory/:id',{withCredentials:true})
        .subscribe(
          (data) => {
            console.log(data)
            this.products= data;
          },
          (error) => {
            console.error('Error fetching products:', error);
          }
        )
        
      }

      rentIt(Id:number){
     //  this.router.navigate([`rentnow/${Id}`]);
       const data = {userid:this.myauth.user,productid:Id};

        this.http.post('http://localhost:8080/add/addtocart', data,{withCredentials:true})
        .subscribe(
          (response) => {
            this.ngxServices.stop();
           Swal.fire("Success","Product added to cart");
  
            console.log(response);
            
          },
          (error) => {
            this.ngxServices.stop();
             
          }
        )
            // Handle error, e.g., display an error message
          }
        
      }
  

