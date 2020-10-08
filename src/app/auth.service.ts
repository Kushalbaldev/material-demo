import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from './models/user';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  loggedInUser: User;
  constructor(private userService: UserService) { }

  checkValidLogin(username: string, password: string): Observable<boolean> {
    // tslint:disable-next-line: max-line-length
    return this.userService.getUserByEmail(username).snapshotChanges().pipe(map(data => data.map(c => ({ key: c.payload.doc.id, ...c.payload.doc.data() }))), map(res => {
      return res[0].password === password;
    })
    );
  }

  checkAlreadyHaveAnAccount(email: string): Observable<boolean> {
    // tslint:disable-next-line: max-line-length
    return this.userService.getUserByEmail(email).snapshotChanges().pipe(map(data => data.map(c => ({ key: c.payload.doc.id, ...c.payload.doc.data() }))), map(res => {
      return res.length === 0;
    })
    );
  }
}
