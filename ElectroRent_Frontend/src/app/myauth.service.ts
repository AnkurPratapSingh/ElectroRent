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
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root',
})
export class MyauthService {
  private isLoggedInSubject = new BehaviorSubject<boolean>(false);
  private isAdminSubject = new BehaviorSubject<boolean>(false);
  public jwtHelper: JwtHelperService = new JwtHelperService();



  constructor(private http: HttpClient) {
    this.isLoggedInSubject.next(this.getUserStatus());
    this.isAdminSubject.next(this.getUserRole())
  }


  isLoggedIn = this.isLoggedInSubject.asObservable();
  isAdmin = this.isAdminSubject.asObservable();

  user: any = null;
  role:any =null;

  async login() {
    const jwtToken = this.getToken();

    // Set the request headers with the JWT
    const headers = new HttpHeaders({
      Authorization: `Bearer ${jwtToken}`,
    });
    this.http
      .get('http://localhost:8080/user/check', {headers})
      .subscribe(
        (res: any) => {
          console.log(res.id,"ye hai service");
          console.log(res);
         
          
         // localStorage.setItem("isLoggedIn", "true");
          //localStorage.setItem("user", res.id);
          //localStorage.setItem("role",res.role);
          
          this.user = parseInt(localStorage.getItem("user") || '0');
          // console.log("user type");
          
          // console.log(typeof(this.user));
          
          this.isLoggedInSubject.next(this.isAuthenticated()); // Notify subscribers about the login status change
          this.isAdminSubject.next(this.getUserRole());
        },
        (err) => {
          console.log(err);
        }
      );
  }

  logout() {
    this.isLoggedInSubject.next(false); 
    this.isAdminSubject.next(false)// Notify subscribers about the logout status change
    this.user = null;
    //localStorage.setItem("isLoggedIn", "false");
    localStorage.setItem("user", "0");
   // localStorage.setItem("role","");
    localStorage.setItem("isPageLoaded","false")
    localStorage.removeItem('token');
  }

  getUserStatus(){
    return this.isAuthenticated();
  }
 getToken(){
  //console.log(localStorage.getItem("jwt"));
  
  return localStorage.getItem("token");

 }
  getUserId(){
   return this.user = parseInt(localStorage.getItem("user") || '0');
  }
  getUserRole(){
    return this.checkUserRole()==="admin";
  }
  checkUserRole(): string | null {
    const token = this.getToken();
 console.log(token);
 
    if (token) {
      const decodedToken = this.jwtHelper.decodeToken(token);
      console.log("role of the user",decodedToken)
      return decodedToken.role; // Assuming the role information is stored in the 'role' claim of the JWT
    }

    return '';
  }
  isAuthenticated(): boolean {
    const token = this.getToken();
   console.log(token);
   
    if (token) {
      return true
    }

    return false;
  }
}

