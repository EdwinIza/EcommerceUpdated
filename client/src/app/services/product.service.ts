import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Products, Product } from '../shared/models/product.model';
import { environment } from '../../environments/environment';
import { ApiService } from './api.service';
import { tap, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private url = environment.apiUrl;

  constructor(private http: HttpClient, private _api: ApiService) {}

  getAllProducts(limitOfResults = 9, page = 1): Observable<Products> {
    return this.http.get<Products>(this.url + 'products', {
      params: {
        limit: limitOfResults.toString(),
        page: page.toString(),
      },
    });
  }

  getSingleProduct(id: number): Observable<any> {
    console.log(id);
    return this._api.getTypeRequest('products/' + id);
  }

  getProductsByCategory(categoryId: number, limitOfResults = 15, page = 1): Observable<Products> {
    return this.http.get<Products>(`${this.url}products/category/${categoryId}`, {
      params: {
        limit: limitOfResults.toString(),
        page: page.toString(),
      },
    }).pipe(
      tap(data => console.log(data)), // Agregar este console.log
      catchError(error => {
        console.error('Error fetching products by category:', error);
        return throwError(error);
      })
    );
  }
}
  