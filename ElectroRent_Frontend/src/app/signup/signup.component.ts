import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import './signup.component.css';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Router } from '@angular/router';

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

  onSubmit(): void {
   // console.log(this.user);
   this.ngxServices.start();
    
    // Send the user data to the Node.js backend
    this.http.post('http://localhost:8080/user/signup', this.user)
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
          console.error(error);
          // Handle error, e.g., display an error message
        }
      );
  }
}
