import { HttpClient } from '@angular/common/http';
import { Component ,OnInit} from '@angular/core';
import { Emitters } from '../emitters/emitters';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{
    
  authenticated = false;

  constructor(private http:HttpClient){}

  ngOnInit():void{
            Emitters.authEmitter.subscribe((auth:boolean,msg:any)=>{
                this.authenticated = auth;
            })
  }

  logout():void{
     this.http.post('http://localhost:8080/user/logout',{},{withCredentials:true})
     .subscribe(()=>this.authenticated=false)
  }
}
