import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MetricsService {
  private url = environment.apiUrl;


  constructor(private http: HttpClient) { }

  // Método para guardar las métricas de acceso a la ayuda
  saveHelpAccessMetrics(data: any): Observable<any> {
    const url = `${this.url}metrics/help-access`;
    return this.http.post(url, data);
  }

  // Método para obtener las métricas de acceso a la ayuda
  getHelpAccessMetrics(): Observable<any> {
    const url = `${this.url}metrics/help-access`;
    return this.http.get(url);
  }

  // Método para guardar las métricas de acceso a la página
  savePageAccessMetrics(data: any): Observable<any> {
    const url = `${this.url}metrics/page-access`;
    return this.http.post(url, data);
  }

  // Método para obtener las métricas de acceso a la página
  getPageAccessMetrics(): Observable<any> {
    const url = `${this.url}metrics/get-page-access`;
    return this.http.get(url);
  }

  // Método para guardar las métricas de error
  saveErrorMetrics(data: any): Observable<any> {
    const url = `${this.url}metrics/error`;
    return this.http.post(url, data);
  }

  // Método para obtener las métricas de error
  getErrorMetrics(): Observable<any> {
    const url = `${this.url}metrics/error`;
    return this.http.get(url);
  }

  // Método para guardar las métricas de transición de página
  savePageTransitionMetrics(data: any): Observable<any> {
    const url = `${this.url}metrics/page-transition`;
    return this.http.post(url, data);
  }

  // Método para obtener las métricas de transición de página
  getPageTransitionMetrics(): Observable<any> {
    const url = `${this.url}metrics/page-transition`;
    return this.http.get(url);
  }

  // Método para guardar las métricas de transacción
  saveTransactionMetrics(data: any): Observable<any> {
    const url = `${this.url}metrics/transaction`;
    return this.http.post(url, data);
  }

  // Método para obtener las métricas de transacción
  getTransactionMetrics(): Observable<any> {
    const url = `${this.url}metrics/transaction`;
    return this.http.get(url);
  }
}
