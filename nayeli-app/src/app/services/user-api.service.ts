import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NewUser, UpdatedUser, User } from '../interfaces/nayeli.interface';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserApiService {
  private url: string = "http://127.0.0.1:5000";
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  currentUser = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient) { }

  /**
   * Sets the User logged to be accessible from anywhere.
   * @param {User} user
   * @returns {void}
   */
  setUser(user: User): void {
    this.currentUserSubject.next(user);
  }

  /**
   * Gets all the users.
   * @returns {Observable<User[]>}
   */
  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.url}/users`)
  }

  /**
   * Gets a user by its email.
   * @param {string} email
   * @param {string} password
   * @returns {Observable<User>}
   */
  getUser(email: string, password: string): Observable<User> {
    const body = {
      email: email,
      password: password
    };
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.post<User>(`${this.url}/user`, body, options);
  }

  /**
   * Adds a new user.
   * @param {NewUser} newUser
   * @returns {Observable<User>}
   */
  addUser(newUser: NewUser): Observable<User> {
    return this.http.post<User>(`${this.url}/user/signup`, newUser);
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
