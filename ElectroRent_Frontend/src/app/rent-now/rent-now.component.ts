import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-rent-now',
  templateUrl: './rent-now.component.html',
  styleUrls: ['./rent-now.component.css']
})
export class RentNowComponent {


constructor(private http: HttpClient) { }

rent() {
  const formData = {
    name: (<HTMLInputElement>document.getElementById('name')).value,
    email: (<HTMLInputElement>document.getElementById('email')).value,
    contactNumber: (<HTMLInputElement>document.getElementById('contactNumber')).value,
    rentalDuration: (<HTMLInputElement>document.getElementById('rentalDuration')).value
  };

  // Send the form data to the backend
  this.http.post('http://localhost:8080/rent-tv', formData)
    .subscribe(
      (response) => {
        console.log('TV rented successfully!', response);
        // Add any success message or redirect to a success page
      },
      (error) => {
        console.error('Error renting TV:', error);
        // Handle the error and display an error message to the user
      }
    );
}
}