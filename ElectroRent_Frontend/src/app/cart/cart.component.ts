import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { MyauthService } from '../myauth.service';
import { PdfService } from '../services/pdf.service';


interface CartItem {
  id: number;
  name: string;
  description: string;
  price: number;
  cartId:number;
}

interface userData{
  name:string,
  email:string,
  contactNumber:string
}

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  cartItems: CartItem[] = [];
  userid: string = '';
  paymentMethod: string = '';
  showPaymentModal: boolean = false;
  isCartEmpty:boolean = false;



  constructor(
    private http: HttpClient,
    private router: Router,
    private ngxServices: NgxUiLoaderService,
    private myauth: MyauthService,
   private pdfService: PdfService
  ) {}
  ngOnInit(): void {


    if(!this.myauth.getUserStatus()){

      this.router.navigate(['/login']);
    }

    this.myauth.getUserId();
    this.userid = this.myauth.user;
    console.log(this.userid);
 

    this.http
      .get<CartItem[]>(`http://localhost:8080/add/getbyid/${this.userid}`)
      .subscribe(
        (response) => {
          this.cartItems = response;
          if(this.cartItems.length == 0)
            this.isCartEmpty = true;
          console.log(this.cartItems);
        },
        (error) => {
          console.error(error);
        }
      );
    // this.getCartItems();
    

  }

  removeFromCart(item: CartItem): void {
    const index = this.cartItems.findIndex(
      (cartItem) => cartItem.id === item.id
    );
    if (index !== -1) {
      this.cartItems.splice(index, 1);

      console.log("itme id",item.cartId)

      this.http.delete(`http://localhost:8080/add/deleteCartItem/${item.cartId}`).subscribe(
        (res)=>{
          console.log("Deleted cart item");
        },
        (err)=>{
            console.log(err);
        }
        
      )
      // Code to update the cart on the server or any other relevant logic
    }
  }
  checkout(): void {
    // Send the cart data to the 
    const orderDetails = {
      name: 'John Doe',
      email: 'john.doe@example.com',
      contactNumber: '1234567890',
      paymentMethod: 'Credit Card',
      totalAmount: 100.0,
      productDetails: [{"name": "Product 1", "price": 50.0}, {"name": "Product 2", "price": 50.0}]
      ,createdBy:'Ankur',
      userid:this.userid
    };
    this.http.get<userData[]>(`http://localhost:8080/user/getUserById/${this.userid}`).subscribe(
      (response) => {
       orderDetails.name=response[0].name;
       orderDetails.email=response[0].email;
       orderDetails.contactNumber= response[0].contactNumber;
       orderDetails.paymentMethod=this.paymentMethod;
      // console.log(this.cartItems) ;
       console.log("iam sndfkjnfjffhdfhfheirufhejfe")
       orderDetails.productDetails=this.cartItems;
      // console.log(orderDetails.productDetails);
       
       orderDetails.createdBy='Ankur';
       orderDetails.totalAmount = this.cartItems.reduce((total, item) => total + item.price, 0);
       console.log(orderDetails)
       this.router.navigate(['/pdfview'], { queryParams: { data: JSON.stringify(orderDetails) } });



      
       
      },
      (error) => {
        console.error('Error during checkout:', error);
        // You can implement further error handling here, like showing an error message.
      }
    );
  }
  onSelectPayment(paymentMethod: string): void {
    this.paymentMethod = paymentMethod;
    this.checkout();
  }
}
