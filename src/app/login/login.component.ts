import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { RxFormBuilder } from '@rxweb/reactive-form-validators';
import { Observable, Subscription } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AuthService } from '../auth.service';
import { LoggedInUser } from '../models/loggedinUser';
import { User } from '../models/user';
import { SnackBarService } from '../snack-bar.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  alreadyHaveAnAccountSubscription: Subscription;

  validateLoginSubscription: Subscription;

  userRegistrationFormGroup: FormGroup;

  user: User;

  isUserCorrect = false;

  isHandset$: Observable<boolean> = this.breakPointObserver.
    observe(Breakpoints.Handset).
    pipe(map(res => res.matches),
      shareReplay()
    );


  // tslint:disable-next-line: max-line-length
  constructor(private breakPointObserver: BreakpointObserver, private router: Router, private formBuilder: RxFormBuilder, private authService: AuthService, private snackBarService: SnackBarService) {
  }

  ngOnDestroy(): void {
    // this.validateLoginSubscription.unsubscribe();
    // this.alreadyHaveAnAccountSubscription.unsubscribe();
  }

  public login(): any {
    if (this.userRegistrationFormGroup.valid) {
      const email = this.userRegistrationFormGroup.controls.email.value as string;
      const password = this.userRegistrationFormGroup.controls.password.value;
      this.alreadyHaveAnAccountSubscription = this.authService.checkAlreadyHaveAnAccount(email.toLowerCase()).subscribe(res => {
        if (!res) {
          this.checkForValidLogin(email.toLowerCase(), password);
          this.alreadyHaveAnAccountSubscription.unsubscribe();
        } else {
          this.snackBarService.openSnackbar('Account does not exists', '');
          this.alreadyHaveAnAccountSubscription.unsubscribe();
        }
      });
    }

  }
  checkForValidLogin(email: string, password: string): any {
    this.validateLoginSubscription = this.authService.checkValidLogin(email, password).subscribe(res => {
      if (res) {
        this.isUserCorrect = false;
        this.router.navigate(['main-view']);
        this.validateLoginSubscription.unsubscribe();
      } else {
        this.isUserCorrect = true;
        this.validateLoginSubscription.unsubscribe();
      }
    });

  }

  ngOnInit(): void {
    const user = new LoggedInUser();
    this.userRegistrationFormGroup = this.formBuilder.formGroup(user);
  }

}
