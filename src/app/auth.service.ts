import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from './models/user';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loggedInUser: User = null;
  constructor(private userService: UserService) { }

  checkValidLogin(username: string, password: string): Observable<boolean> {
    // tslint:disable-next-line: max-line-length
    return this.userService.getUserByEmail(username).snapshotChanges().pipe(map(data => data.map(c => ({ key: c.payload.doc.id, ...c.payload.doc.data() }))), map(res => {
      this.loggedInUser = res[0];
      localStorage.setItem('loggedInUser', JSON.stringify(this.loggedInUser));
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

  getLoggedInUser(): any {
    return this.loggedInUser;
  }

  isUserLoggedIn(): boolean {
    if (this.loggedInUser != null) {
      return true;
    } else {
      const localestorage: string = localStorage.getItem('loggedInUser');
      if (localestorage != null) {
        this.loggedInUser = (JSON.parse(localestorage) as User);
        if (this.loggedInUser != null) {
          return true;
        } else {
          return false;
        }
      }
    }
  }
}
