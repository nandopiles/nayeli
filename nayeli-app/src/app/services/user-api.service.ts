import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NewUser, UpdatedUser, User } from '../interfaces/nayeli.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserApiService {
  private url: string = "http://127.0.0.1:5000"

  constructor(public http: HttpClient) { }

  /**
   * Gets all the users.
   * @returns {Observable<User[]>}
   */
  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.url}/users`)
  }

  /**
   * Gets a user by its id.
   * @param {number} userId
   * @returns {Observable<User>}
   */
  getUser(userId: number): Observable<User> {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      body: {
        id: userId
      }
    };
    return this.http.get<User>(`${this.url}/user`, options)
  }

  /**
   * Adds a new user.
   * @param {NewUser} newUser
   * @returns {Observable<User>}
   */
  addUser(newUser: NewUser): Observable<User> {
    return this.http.post<User>(`${this.url}/user`, newUser);
  }

  /**
   * Updates an existing user.
   * @param {UpdatedUser} updatedUser
   * @returns {Observable<User>}
   */
  updateUser(updatedUser: UpdatedUser): Observable<User> {
    return this.http.put<User>(`${this.url}/user`, updatedUser);
  }

  /**
   * Deletes user by its id.
   * @param {number} userId the user's id which is going to be deleted
   * @returns {Observable<any>}
   */
  deleteUser(userId: number): Observable<any> {
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
