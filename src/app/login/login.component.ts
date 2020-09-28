import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { RxFormBuilder } from '@rxweb/reactive-form-validators';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { User } from '../models/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  userRegistrationFormGroup: FormGroup;

  isHandset$: Observable<boolean> = this.breakPointObserver.
    observe(Breakpoints.Handset).
    pipe(map(res => res.matches),
      shareReplay()
    );

  constructor(private breakPointObserver: BreakpointObserver, private router: Router, private formBuilder: RxFormBuilder) { }

  public login() {
    if(this.userRegistrationFormGroup.valid){
      this.router.navigate(['main-view']);
    }
    
  }

  ngOnInit(): void {
    let user = new User();
    this.userRegistrationFormGroup = this.formBuilder.formGroup(user);
  }

}
