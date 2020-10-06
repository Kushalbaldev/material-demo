import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppFeature } from './models/app-feature';
import { User } from './models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>('https://my-json-server.typicode.com/Kushalbaldev/FakeRepo/Users');
  }

  getUserByEmail(emailId: string): Observable<User[]> {
    const params = new
      HttpParams().set('email', emailId);

    return this.http.get<User[]>('https://my-json-server.typicode.com/Kushalbaldev/FakeRepo/Users', { params });
  }
}


