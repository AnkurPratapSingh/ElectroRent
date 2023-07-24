// import { CanActivateFn } from '@angular/router';
// import { CookieService } from 'ngx-cookie-service';

// export const authGuard: CanActivateFn = (route, state) => {
//   const token = this.cookieService.get('jwt'); // Replace 'jwt' with the actual name of the token cookie

//   if (token) {
//     // User is authenticated, allow access to the route
//     return true;
//   } else {
//     // User is not authenticated, redirect to the login page or any other appropriate action
//     this.router.navigate(['/login']); // Replace '/login' with the login route path
//     return false;
//   }
// // };
// import { CanActivateFn } from '@angular/router';
// import { CookieService } from 'ngx-cookie-service';
// import { Router } from '@angular/router';

// export const authGuard: CanActivateFn = (route, state) => {
//   const token = route.injector.get(CookieService).get('jwt'); // Replace 'jwt' with the actual name of the token cookie
//   const router = route.injector.get(Router);

//   if (token) {
//     // User is authenticated, allow access to the route
//     return true;
//   } else {
//     // User is not authenticated, redirect to the login page or any other appropriate action
//     router.navigate(['/login']); // Replace '/login' with the login route path
//     return false;
//   }
// };
import { HttpClient } from '@angular/common/http';


import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private cookieService: CookieService, private router: Router ,private http:HttpClient) {}
  isAuthenticated : boolean = false;
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    this.http.get('http://localhost:8080/user/checkAuthentication',{withCredentials:true})
    .subscribe(
     (res:any)=>{
       console.log(res);
       
        this.isAuthenticated = res.isAuthenticated; 
       
     },
     (err)=>{
                 console.log(err) 
     })

     return this.isAuthenticated;
    }
  }

