import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NewProduct, Product, ProductSearch, UpdatedProduct } from '../interfaces/nayeli.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductApiService {
  private url: string = "http://127.0.0.1:5000"

  constructor(public http: HttpClient) { }

  /**
   * Gets all the products.
   * @returns {Observable<Product[]>}
   */
  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.url}/products`)
  }

  /**
   * Performs a product search.
   * @param {ProductSearch} searchRequest
   * @returns {Observable<Product[]>}
   */
  searchProducts(searchRequest: ProductSearch): Observable<Product[]> {
    return this.http.post<Product[]>(`${this.url}/products/search`, searchRequest);
  }

  /**
   * Gets a product by its id.
   * @param {number} productId
   * @returns {Observable<Product>}
   */
  getProduct(productId: number): Observable<Product> {
    const params = new HttpParams().set('id', productId.toString());

    return this.http.get<Product>(`${this.url}/product`, { params });
  }

  /**
   * Adds a new product.
   * @param {NewProduct} newProduct
   * @returns {Observable<Product>}
   */
  addProduct(newProduct: NewProduct): Observable<Product> {
    return this.http.post<Product>(`${this.url}/product`, newProduct);
  }

  /**
   * Updates an existing product.
   * @param {UpdatedProduct} updatedProduct
   * @returns {Observable<Product>}
   */
  updateProduct(updatedProduct: UpdatedProduct): Observable<Product> {
    return this.http.put<Product>(`${this.url}/product`, updatedProduct);
  }

  /**
   * Deletes product by its id.
   * @param {number} productId the product's id which is going to be deleted
   * @returns {Observable<any>}
   */
  deleteProduct(productId: number): Observable<any> {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      body: {
        id: productId
      }
    };
    return this.http.delete<any>(`${this.url}/product`, options);
  }
}
