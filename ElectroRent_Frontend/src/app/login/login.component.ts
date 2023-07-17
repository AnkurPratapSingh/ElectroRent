import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Router } from '@angular/router';


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
  constructor(private http: HttpClient, private router:Router,private ngxServices:NgxUiLoaderService ) {}


  onSubmit(): void {
    // Handle login logic
    this.ngxServices.start();

    console.log('Login form submitted');
    console.log('User:', this.user);
    this.http.post('http://localhost:8080/user/login', this.user)
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
