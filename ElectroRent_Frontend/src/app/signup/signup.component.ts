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
  showRules: boolean = true;

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

  validatePassWord(pass:any){
  //  var validRegex = "^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$"
    const validRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

  if(pass.match(validRegex))
   return true;
   else
   return false;

  }
  onSubmit(): void {
   // console.log(this.user);
  // console.log(this.user);
   if(this.user.name == "" || this.user.email == "" || this.user.contactNumber == "" || this.user.password == ""){
        Swal.fire({
          title: 'Error',
          text: "Please fill all the fields",
          icon: 'warning',
          confirmButtonColor: '#4caF50',
          confirmButtonText: 'Ok'
        })
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
   else if(!this.validateNumber(this.user.contactNumber))
   {
    Swal.fire("Error","Enter a valid 10 digit number")
    Swal.fire({
      title: 'Error',
      text: "Fill valid Contact with 10 digit",
      icon: 'warning',
      confirmButtonColor: '#4caF50',
      confirmButtonText: 'Ok'
    })
   }
   else if(!this.validatePassWord(this.user.password)){
    Swal.fire("Error","Enter a valid Password")
    Swal.fire({
      title: 'Error',
      text: "Fill valid Password",
      icon: 'warning',
      confirmButtonColor: '#4caF50',
      confirmButtonText: 'Ok'
    })


   }
   else{
   this.ngxServices.start();
    
    // Send the user data to the Node.js backend
    this.http.post('http://localhost:8080/user/signup', this.user,{withCredentials:true})
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
         { console.error(error);
          Swal.fire("Error", error.error.message)
          // Handle error, e.g., display an error message
        }}
      );
  }
}
showPasswordRules() {
  this.showRules = true;
  //Swal.fire("","Be at least 8 characters long <br> Contain at least one uppercase letter (A-Z) or one lowercase letter (a-z)<br> Contain at least one digit (0-9)<br> Contain at least one special character from the set @$!%*#?&</l");
  Swal.fire({
    title: 'Error',
    html: "At least 8 characters long <br>At least one uppercase letter(A-Z) <br>At least one lowercase letter(a-z)<br> Contain at least one digit (0-9)<br> Contain at least one special character from the set @$!%*#?&</l",
    icon: 'warning',
    confirmButtonColor: '#4caF50',
    confirmButtonText: 'Ok'
  })
}


}
