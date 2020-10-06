import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { RxFormBuilder } from '@rxweb/reactive-form-validators';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { LoggedInUser } from '../models/loggedinUser';
import { User } from '../models/user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  userRegistrationFormGroup: FormGroup;

  user: User;

  isUserCorrect = false;

  isHandset$: Observable<boolean> = this.breakPointObserver.
    observe(Breakpoints.Handset).
    pipe(map(res => res.matches),
      shareReplay()
    );


  // tslint:disable-next-line: max-line-length
  constructor(private breakPointObserver: BreakpointObserver, private router: Router, private formBuilder: RxFormBuilder, private userService: UserService) {
  }

  public login(): any {
    console.log('inlogin');
    if (this.userRegistrationFormGroup.valid) {
      const email = this.userRegistrationFormGroup.controls.email.value;
      console.log(email);
      this.userService.getUserByEmail(email).subscribe(res => {
        console.log(res);
        if (res !== null && typeof res !== 'undefined' && res.length > 0) {
          this.user = res[0];
          if (this.validateUser(this.user)) {
            this.isUserCorrect = false;
            this.router.navigate(['main-view']);
          } else {
            this.isUserCorrect = true;
          }
        } else {
          this.isUserCorrect = true;
        }
      });
    }
  }
  validateUser(user: User): boolean {
    const checkpass = this.userRegistrationFormGroup.controls.password.value;
    if (user.password === checkpass) {
      return true;
    } else {
      return false;
    }

  }

  ngOnInit(): void {
    const user = new LoggedInUser();
    this.userRegistrationFormGroup = this.formBuilder.formGroup(user);
  }

}
