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
      Swal.fire({
        title: 'Error',
        text: "Please fill all the Fields ",
        icon: 'warning',
        confirmButtonColor: '#4caF50',
        confirmButtonText: 'Ok'
      });
      
 }

 else if(!this.validateEmail(this.user.email)){
  Swal.fire({
  title: 'Error',
  text: "Fill valid email",
  icon: 'warning',
  confirmButtonColor: '#4caF50',
  confirmButtonText: 'Ok'
})
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
          const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 1500,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.addEventListener('mouseenter', Swal.stopTimer)
              toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
          })
          
          Toast.fire({
            icon: 'success',
            title: 'logged in successfully'
          })
          setTimeout(() => {
            this.router.navigate(['/']);

          }, 1000);
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
