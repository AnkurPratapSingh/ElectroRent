


import { Component } from '@angular/core';
import { PdfService } from '../services/pdf.service';
@Component({
  selector: 'app-pdf-viewer',
  templateUrl: './pdf-viewer.component.html',
  styleUrls: ['./pdf-viewer.component.css']
})
export class PdfViewerComponent {
  generatedUuid: string | undefined;
  pdfUrl: string | undefined;

  constructor(private pdfService: PdfService) {
  }

  generatePDF(): void {
    const orderDetails = {
      name: 'John Doe',
      email: 'john.doe@example.com',
      contactNumber: '1234567890',
      paymentMethod: 'Credit Card',
      totalAmount: 100.0,
      productDetails: '[{"name": "Product 1", "price": 50.0}, {"name": "Product 2", "price": 50.0}]'
      ,createdBy:'Ankur'
    };

    this.pdfService.generatePdf(orderDetails).subscribe(
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
          this.pdfUrl = URL.createObjectURL(pdfData);
        },
        (error) => {
          console.error('Error fetching PDF:', error);
        }
      );
    }
  }
}
