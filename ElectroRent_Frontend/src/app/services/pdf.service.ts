import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PdfService {
  private backendUrl = 'http://localhost:8080/bill'; // Replace with your backend URL

  constructor(private http: HttpClient) { }

  generatePdf(orderDetails: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(`${this.backendUrl}/generateReport`, orderDetails, { headers });
  }

  getPdf(uuid: string): Observable<Blob> {
    
    return this.http.get(`${this.backendUrl}/getPdf?uuid=${uuid}`, { responseType: 'blob' });
  }
}
