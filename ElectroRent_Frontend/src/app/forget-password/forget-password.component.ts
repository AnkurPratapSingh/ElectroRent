import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent {
  user = {
    email: '',
  
  };
  responseMessage: any;
  constructor(private http: HttpClient, private router:Router,private ngxServices:NgxUiLoaderService ) {}
   
  onSubmit(): void {
    this.ngxServices.start();

    // Handle login logic
    console.log('Login form submitted');
    console.log('User:', this.user);
    this.http.post('http://localhost:8080/user/forgotPassword', this.user)
      .subscribe(
        (response) => {
          this.ngxServices.stop();

          console.log(response);
          this.router.navigate(['/login']);
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
    // Add your login logic here
  }

}
