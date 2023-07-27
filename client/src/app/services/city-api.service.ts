import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CityApiService {
  private serverBaseUrl = 'http://localhost:5000'; // Update this with your server's base URL

  constructor(private http: HttpClient) {}

  getCitiesByCountry(countryCode: string): Observable<any> {
    const geonameId = this.getGeonameIdByCountryCode(countryCode);
    if (geonameId) {
      const url = `${this.serverBaseUrl}/api/cities?geonameId=${geonameId}`;
      return this.http.get<any>(url);
    } else {
      return new Observable<any>(); // Return an empty Observable if no geonameId found
    }
  }

  // ... Rest of the code for the CityApiService ...

  // Mapear códigos de países a geonameId
  private getGeonameIdByCountryCode(countryCode: string) {
    // Puedes implementar un mapeo de códigos de países a geonameId según tu necesidad
    // Por ejemplo, puedes usar un objeto o una tabla de búsqueda
    const countryCodesToGeonameIds: { [key: string]: number } = {
      // Mapear códigos de países a geonameId aquí
      // Ejemplo:
      US: 6252001, // geonameId para Estados Unidos
      CA: 6251999, // geonameId para Canadá
      GB: 2635167, // geonameId para Reino Unido
    };
    return countryCodesToGeonameIds[countryCode];
  }
}
