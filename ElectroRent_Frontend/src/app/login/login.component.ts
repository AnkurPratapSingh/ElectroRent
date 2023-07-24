import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { MyauthService } from '../myauth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  user = {
    email: '',
    password: ''
  };
  responseMessage: any;
  constructor(private http: HttpClient, private router:Router,private ngxServices:NgxUiLoaderService, private myauth:MyauthService ) {}
  
  validateEmail(email:any){
    var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  if(email.match(validRegex))
   return true;
   else
   return false;

  }

  onSubmit(): void {
    if(this.user.email == "" || this.user.password == ""){
      Swal.fire("Error","Please fill all the fields");
 }

 else if(!this.validateEmail(this.user.email)){
  Swal.fire("Error","Please fill valid Email");
 }
    // Handle login logic
    else{
    this.ngxServices.start();

    console.log('Login form submitted');
    console.log('User:', this.user);
    this.http.post('http://localhost:8080/user/login', this.user,{withCredentials:true})
      .subscribe(
        (response) => {
          this.ngxServices.stop();
          this.myauth.login();

          console.log(response);
          this.router.navigate(['/']);
          // Handle success, e.g., redirect to another page
        },
        (error) => {
          this.ngxServices.stop();
          if(error.error?.message){
          this.responseMessage = error.error?.message;
          Swal.fire("Error",this.responseMessage);
        }
          console.error(error);
          // Handle error, e.g., display an error message
        }
      );
   
  }
  }
}
