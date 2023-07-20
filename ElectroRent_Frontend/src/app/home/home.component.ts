import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Emitters } from '../emitters/emitters';
import { LoginComponent } from '../login/login.component';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { OwlOptions } from 'ngx-owl-carousel-o';




@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{

  message:any
  authenticated:boolean = false;
  products: any[] = [
    {      
    image: '../assets/1.jpg'
    },
    {      
    image: '../assets/2.jpg'
    },
    {      
    image: '../assets/3.jpg'
    },
    {      
    image: '../assets/4.jpg'
    },
    {      
    image: '../assets/5.jpg'
    },
    {  
    image: '../assets/6.jpg'
    },
  ];

  shuffleProducts() {
    for (let i = this.products.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.products[i], this.products[j]] = [this.products[j], this.products[i]];
    }
  }

  

  constructor(private http:HttpClient){}

  
  ngOnInit():void{
    console.log("it angualr")
     this.http.get('http://localhost:8080/user/check',{withCredentials:true})
     .subscribe(
      (res:any)=>{
        console.log(res);
        
        this.message=`${res.name}`;
        Emitters.authEmitter.emit(true);
        console.log(this.message);
        this.authenticated= true;
        

      },
      (err)=>{
        this.message=err;
        Emitters.authEmitter.emit(false);

        console.log(err);
        
      })
      setInterval(() => {
        this.shuffleProducts();
      }, 500);
     
  }
}

