import { HttpClient } from '@angular/common/http';
import { Component ,OnInit} from '@angular/core';
import { Emitters } from '../emitters/emitters';
import { MyauthService } from '../myauth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
    
  authenticated:boolean=false;


  constructor(private http:HttpClient, private myauth:MyauthService){};
  

  ngOnInit():void{
   // console.log(this.authenticated);
    
    // this.authenticated = this.myauth.isLoggedIn;
    this.myauth.isLoggedIn.subscribe((isLoggedIn) => {
      this.authenticated = isLoggedIn;
      // Do whatever you want with the new isLoggedIn value
    });
   
  }

  logout():void{
     this.http.post('http://localhost:8080/user/logout',{},{withCredentials:true})
     .subscribe(()=>this.authenticated=false);
     this.myauth.logout();
  }
}
