import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
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

  // tslint:disable-next-line: typedef
  public createUser(data) {
    console.log('in user service' + data);
    const httpheaders = new HttpHeaders().set('Content-Type', 'application/Json');
    const options = {
      headers: httpheaders
    };

    let data1 = {
      firstName: 'jopo',
      lastName: 'Baldev',
      email: 'jopo@gmail.com',
      role: 'admin',
      password: 'admin123'
    };

    // tslint:disable-next-line: max-line-length
    this.http.post<any>('https://my-json-server.typicode.com/Kushalbaldev/FakeRepo/Users', data1, options).subscribe(res => console.log(res));

  }
}


