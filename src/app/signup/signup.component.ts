import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { RxFormBuilder } from '@rxweb/reactive-form-validators';
import { Observable, Subscription } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AuthService } from '../auth.service';
import { User } from '../models/user';
import { SnackBarService } from '../snack-bar.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit, OnDestroy {

  userRegistrationFormGroup: FormGroup;

  private signupFormValue: User;

  alreadyHaveAnAccountSubscription: Subscription;

  isHandset$: Observable<boolean> = this.breakPointObserver.
    observe(Breakpoints.Handset).
    pipe(map(res => res.matches),
      shareReplay()
    );

  // tslint:disable-next-line: max-line-length
  constructor(private breakPointObserver: BreakpointObserver, private router: Router, private formBuilder: RxFormBuilder, private authService: AuthService, private snackBarService: SnackBarService, private userService: UserService) { }

  ngOnInit(): void {
    const user = new User();
    this.userRegistrationFormGroup = this.formBuilder.formGroup(user);
  }

  ngOnDestroy(): void {
    // this.alreadyHaveAnAccountSubscription.unsubscribe();
  }

  public signup(): any {
    if (this.userRegistrationFormGroup.valid) {
      this.signupFormValue = this.userRegistrationFormGroup.value;
      const email = this.signupFormValue.email;
      this.alreadyHaveAnAccountSubscription = this.authService.checkAlreadyHaveAnAccount(email).subscribe(res => {
        console.log(res);
        if (res) {
          this.snackBarService.openSnackbar('Congratulations', 'Accoount created successfully');
          this.userService.createUser(this.signupFormValue);
          this.router.navigate(['/main-view/dashboard']);
          this.alreadyHaveAnAccountSubscription.unsubscribe();
        } else {
          this.snackBarService.openSnackbar('Cannot create account.An account with same email already Exists', '');
          this.alreadyHaveAnAccountSubscription.unsubscribe();
        }
      });
    }
  }
}
