import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { RxFormBuilder } from '@rxweb/reactive-form-validators';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { User } from '../models/user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  userRegistrationFormGroup: FormGroup;

  private usersave: User;

  isHandset$: Observable<boolean> = this.breakPointObserver.
    observe(Breakpoints.Handset).
    pipe(map(res => res.matches),
      shareReplay()
    );

  // tslint:disable-next-line: max-line-length
  constructor(private breakPointObserver: BreakpointObserver, private router: Router, private formBuilder: RxFormBuilder, private userService: UserService, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    const user = new User();
    this.userRegistrationFormGroup = this.formBuilder.formGroup(user);
  }

  public signup(): any {
    if (this.userRegistrationFormGroup.valid) {
      this.usersave = this.userRegistrationFormGroup.value;
      this.userService.getUserByEmail(this.usersave.email).subscribe(res => {
        if (res !== null && typeof res !== 'undefined' && res.length > 0) {
          this.openSnackbar('Cannot create account.An account with same email already Exists', '');
        } else {
          this.openSnackbar('Account Created', 'Congratulations');
          this.userService.createUser(this.usersave);
        }
      });

      console.log(this.usersave);
    } else {
      console.log('Not Valid');
    }
  }

  openSnackbar(message: string, action: string): any {
    this.snackBar.open(message, action, {
      duration: 2000,
      horizontalPosition: 'center',
      verticalPosition: 'top'
    });
  }
}
