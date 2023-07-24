


import { Component } from '@angular/core';
import { PdfService } from '../services/pdf.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-pdf-viewer',
  templateUrl: './pdf-viewer.component.html',
  styleUrls: ['./pdf-viewer.component.css']
})
export class PdfViewerComponent {
  generatedUuid: string | undefined;
  pdfUrl: SafeResourceUrl | undefined;
  orderDetails:any;

  constructor(private pdfService: PdfService, private sanitizer: DomSanitizer, private route:ActivatedRoute) {
  }
 
  ngOnInit(){
    this.route.queryParams.subscribe(params => {
      const data = params['data'];
      this.orderDetails = JSON.parse(data);
      console.log("1233467899086543");
      
      console.log(this.orderDetails);
  })}


  generatePDF(): void {
    // const orderDetails = {
    //   name: 'John Doe',
    //   email: 'john.doe@example.com',
    //   contactNumber: '1234567890',
    //   paymentMethod: 'Credit Card',
    //   totalAmount: 100.0,
    //   productDetails: '[{"name": "Product 1", "price": 50.0}, {"name": "Product 2", "price": 50.0}]'
    //   ,createdBy:'Ankur'
    // };

    this.pdfService.generatePdf(this.orderDetails).subscribe(
      (response: any) => {
        this.generatedUuid = response.uuid;
        console.log(this.generatedUuid);
        this.fetchPDF();
      },
      (error) => {
        console.error('Error generating PDF:', error);
      }
    );
  }

  fetchPDF(): void {
    if (this.generatedUuid) {
      this.pdfService.getPdf(this.generatedUuid).subscribe(
        (pdfData: Blob) => {
          const unsafePdfUrl = URL.createObjectURL(pdfData);
          this.pdfUrl = this.sanitizer.bypassSecurityTrustResourceUrl(unsafePdfUrl)
        },
        (error) => {
          console.error('Error fetching PDF:', error);
        }
      );
    }
  }
}
