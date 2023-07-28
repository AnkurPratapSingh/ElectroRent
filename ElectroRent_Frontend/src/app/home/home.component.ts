import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Emitters } from '../emitters/emitters';
import { LoginComponent } from '../login/login.component';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { MyauthService } from '../myauth.service';
import { Route, Router } from '@angular/router';




@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  isPageReloaded = false;
  currentDate: Date = new Date();


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

  

  constructor(private http:HttpClient,  private router:Router,private myauth:MyauthService){}
 num:number = 0

  
  ngOnInit():void{
    if(!this.myauth.isLoggedIn){
      this.router.navigate(['/login']);
    return;}
 console.log(this.currentDate, "Aaj ki date");
 
    // if (!this.isPageReloaded) {
    //   this.isPageReloaded = true;
    //   window.location.reload();
    // }
    // const isPageLoaded = localStorage.getItem('isPageLoaded');
    // console.log(isPageLoaded,"reloading");
    
    // if (isPageLoaded=="false") {
    //   console.log("isreloadin");
      
    //   localStorage.setItem('isPageLoaded', 'true');
    //   //window.location.reload();
    //   setTimeout(() => {
    //     location.reload();
    //   }, 0);
    // }
    console.log("it angualr")
    
      setInterval(() => {
        this.shuffleProducts();
      }, 500);
     
  }
  reload(){
     window.location.reload();
     this.num=1
  }
}

