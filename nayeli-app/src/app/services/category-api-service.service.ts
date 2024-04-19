import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Category } from '../interfaces/nayeli.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryApiServiceService {
  private url: string = "http://127.0.0.1:5000"

  constructor(public http: HttpClient) { }

  /**
   * Gets all the categories.
   * @returns {Observable<Product[]>}
   */
  public getAllCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.url}/categories`)
  }
}
