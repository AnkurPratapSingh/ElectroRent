// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';

// @Injectable({
//   providedIn: 'root',
// })
// export class MyauthService {
//   constructor(private http: HttpClient) {}

//   isLoggedIn: boolean = false;
//   user: any = null;

//   login() {
//     this.isLoggedIn = true;
//     this.http
//       .get('http://localhost:8080/user/check', { withCredentials: true })
//       .subscribe(
//         (res: any) => {
//           console.log(res);
//           this.user = res;
//           //console.log("I am myauth");
          
//           //console.log(this.isLoggedIn);
//         },
//         (err) => {
//           console.log(err);
//         }
//       );
//   }

//   logout(){
//     this.isLoggedIn=false;
//     this.user=null;
//     //console.log("I am logout");
    
//   }
// }

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MyauthService {
  private isLoggedInSubject = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) {
    this.isLoggedInSubject.next(this.getUserStatus());
  }


  isLoggedIn = this.isLoggedInSubject.asObservable();

  user: any = null;

  login() {
    this.http
      .get('http://localhost:8080/user/check', { withCredentials: true })
      .subscribe(
        (res: any) => {
          console.log(res.id,"ye hai service");
          localStorage.setItem("isLoggedIn", "true");
          localStorage.setItem("user", res.id);
          
          this.user = parseInt(localStorage.getItem("user") || '0');
          // console.log("user type");
          
          // console.log(typeof(this.user));
          
          this.isLoggedInSubject.next(true); // Notify subscribers about the login status change
        },
        (err) => {
          console.log(err);
        }
      );
  }

  logout() {
    this.isLoggedInSubject.next(false); // Notify subscribers about the logout status change
    this.user = null;
    localStorage.setItem("isLoggedIn", "false");
    localStorage.setItem("user", "0");
  }

  getUserStatus(){
    return localStorage.getItem("isLoggedIn")==="true";
  }

  getUserId(){
    this.user = parseInt(localStorage.getItem("user") || '0');
  }
}

