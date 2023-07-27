import { HttpClient } from '@angular/common/http';
import { Component ,OnChanges,OnInit, SimpleChanges} from '@angular/core';
import { Emitters } from '../emitters/emitters';
import { MyauthService } from '../myauth.service';
import { SharedService } from '../services/shared.services';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
    
  authenticated:boolean=false;
  role:string;
  admin:boolean=false;
  

  constructor(private http:HttpClient, private myauth:MyauthService , private shared:SharedService){};
  

  ngOnInit():void{
   // console.log(this.authenticated);
   // this.role=this.myauth.getUserRole() || ''
    
    // this.authenticated = this.myauth.isLoggedIn;
    this.myauth.isLoggedIn.subscribe((isLoggedIn: boolean) => {
      
      this.authenticated = isLoggedIn;
    //  this.admin=isAdmin;
      // Do whatever you want with the new isLoggedIn value
    });
    this.myauth.isAdmin.subscribe((isAdmin)=>{
         this.admin = isAdmin
    })
    console.log("isAdmin",this.admin);
    
    // this.role = localStorage.getItem('role') || '';

    // // Set the role in the SharedService
    // this.shared.setRole(this.role);

    // // Subscribe to changes in the role from the shared service
    // this.shared.role$.subscribe(role => {
    //   this.role = role;
    //   // Call reloadNavbar to update the navbar content based on the new role value
    //   this.reloadNavbar();
    // });

    // Call reloadNavbar initially to set the navbar content based on the initial role value
    // this.reloadNavbar();
  
 
  }
 
  

  logout():void{
     this.http.post('http://localhost:8080/user/logout',{},{withCredentials:true})
     .subscribe(()=>this.authenticated=false);
     this.myauth.logout();
  }
}
