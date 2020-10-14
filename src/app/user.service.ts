import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { User } from './models/user';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { EndPoints } from './commons/endpoints';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private dbPath = EndPoints.USER_ENDPOINT;

  userRef: AngularFirestoreCollection<User> = null;


  users = [
    {
      id: 1,
      firstName: 'Kushal',
      lastName: 'Baldev',
      email: 'baldevkushal@gmail.com',
      role: 'admin',
      password: 'admin123'
    },
    {
      id: 2,
      firstName: 'Rami',
      lastName: 'Baldev',
      email: 'baldevkushal@gmail.com',
      role: 'admin',
      password: 'admin123'
    }];

  constructor(private http: HttpClient, private db: AngularFirestore) {
    this.userRef = db.collection(this.dbPath);
    // db.collection('users').valueChanges().subscribe(res => {
    //   console.log(res);
    // });



    // users.forEach(e=>{
    //   db.collection('users').add(e);
    // });

    // db.collection('users').snapshotChanges().pipe(map(changes => changes.map(c => ({
    //   id: c.payload.doc.id, ...c.payload.doc.data
    // })))).subscribe(users => {
    //   console.log(users);
    // });


  }

  createUser(user: User): void {
    this.db.collection('/users').add(user);
  }

  updateUser(key: string, value: any): Promise<void> {
    return this.db.collection('/users').doc(key).update(value);
  }


  deleteUsers(key: string): Promise<void> {
    return this.userRef.doc(key).delete();
  }

  getUserList(): AngularFirestoreCollection<User> {
    return this.userRef;
  }

  getUserByEmail(email: string): AngularFirestoreCollection<User> {
    return this.db.collection('/users', ref => ref.where('email', '==', email));
  }

  deleteAll(): any {
    this.userRef.get().subscribe(querySnapshot => {
      querySnapshot.forEach((doc) => {
        doc.ref.delete();
      });
    }, error => {
      console.log(error);
    });
  }





  // Below is the code of how to perform operations using HttpClient
  // getUsers(): Observable<User[]> {
  //   return this.http.get<User[]>('https://my-json-server.typicode.com/Kushalbaldev/FakeRepo/Users');
  // }

  // getUserByEmail(emailId: string): Observable<User[]> {
  //   const params = new
  //     HttpParams().set('email', emailId);

  //   return this.http.get<User[]>('https://my-json-server.typicode.com/Kushalbaldev/FakeRepo/Users', { params });
  // }

  // // tslint:disable-next-line: typedef
  // public createUser(data) {
  //   console.log('in user service' + data);
  //   const httpheaders = new HttpHeaders().set('Content-Type', 'application/Json');
  //   const options = {
  //     headers: httpheaders
  //   };

  //   // tslint:disable-next-line: max-line-length
  // tslint:disable-next-line: max-line-length
  //   this.http.post<any>('https://my-json-server.typicode.com/Kushalbaldev/FakeRepo/Users', data, options).subscribe(res => console.log(res));

  // }
}


