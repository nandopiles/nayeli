import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../interfaces/nayeli.interface';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {
  private url: string = "http://127.0.0.1:5000"

  constructor(public http: HttpClient) { }

  /**
   * Gets all the users
   * @returns {Observable<User[]>}
   */
  public getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.url}/users`)
  }

  /**
   * Deletes a specific user by its id
   * @param {number} userId the user's id which is going to be deleted
   * @returns {Observable<any>}
   */
  public deleteUser(userId: number): Observable<any> {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      body: {
        id: userId
      }
    };
    return this.http.delete<any>(`${this.url}/user`, options);
  }
}
