import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../interfaces/nayeli.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductApiServiceService {
  private url: string = "http://127.0.0.1:5000"

  constructor(public http: HttpClient) { }

  /**
   * Gets all the products.
   * @returns {Observable<Product[]>}
   */
  public getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.url}/products`)
  }

  /**
   * Gets a product by its id.
   * @returns {Observable<User>}
   */
  public getProduct(productId: number): Observable<Product> {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      body: {
        id: productId
      }
    };
    return this.http.get<Product>(`${this.url}/product`, options)
  }
}
