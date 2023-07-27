import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import './signup.component.css';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

interface User {
  name: string;
  email: string;
  contactNumber: string;

  password: string;
}

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  user: User = {
    name: '',
    email: '',
    contactNumber:'',
    password: ''
  };
  responseMessage: any;

  constructor(private http: HttpClient, private router:Router,private ngxServices:NgxUiLoaderService ) {}

  validateNumber(number:any){
   
      var validRegex = "^[0-9]{10}$";
      
    if(number.match(validRegex))
     return true;
     else
     return false;
  
  

  }
  validateEmail(email:any){
    var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  if(email.match(validRegex))
   return true;
   else
   return false;

  }

  onSubmit(): void {
   // console.log(this.user);
   console.log(this.user);
   if(this.user.name == "" || this.user.email == "" || this.user.contactNumber == "" || this.user.password == ""){
        Swal.fire("Error","Please fill all the fields");
   }

   else if(!this.validateEmail(this.user.email)){
    Swal.fire("Error","Please fill valid Email");

   }
   else if(!this.validateNumber(this.user.contactNumber))
   {
    Swal.fire("Error","Enter a valid 10 digit number")
   }
   else{
   this.ngxServices.start();
    
    // Send the user data to the Node.js backend
    this.http.post('http://localhost:8080/user/signup', this.user,{withCredentials:true})
      .subscribe(
        (response) => {
          this.ngxServices.stop();

          console.log(response);
          
          this.router.navigate(['/']);
          // Handle success, e.g., redirect to another page
        },
        (error) => {
          this.ngxServices.stop();
          if(error.error?.message)
          this.responseMessage = error.error?.message;
         { console.error(error);
          Swal.fire("Error", error.error.message)
          // Handle error, e.g., display an error message
        }}
      );
  }
}
}
