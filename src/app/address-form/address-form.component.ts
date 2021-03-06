import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatMenuTrigger } from '@angular/material/menu';
import { BehaviorSubject, Observable, Subscription, timer } from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  map,
  pluck,
  shareReplay,
  switchMap,
} from 'rxjs/operators';
import { SpellchekerService } from '../spellcheker.service';

@Component({
  selector: 'app-address-form',
  templateUrl: './address-form.component.html',
  styleUrls: ['./address-form.component.scss'],
})
export class AddressFormComponent implements OnInit, AfterViewInit, OnDestroy {
  hasUnitNumber = false;
  display = 'flex';
  dm = 'margin';
  show = true;

  @ViewChild(MatMenuTrigger) trigger: MatMenuTrigger;
  private spellcheckSubscription: Subscription;
  public suggestedWord = '';

  private spellcheckSubService: Subscription;

  addressForm = this.fb.group({
    company: null,
    firstName: [null, Validators.required],
    lastName: [null, Validators.required],
    address: [null, Validators.required],
    address2: null,
    city: [null, Validators.required],
    state: [null, Validators.required],
    postalCode: [
      null,
      Validators.compose([
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(5),
      ]),
    ],
    shipping: ['free', Validators.required],
  });

  states = [
    { name: 'Alabama', abbreviation: 'AL' },
    { name: 'Alaska', abbreviation: 'AK' },
    { name: 'American Samoa', abbreviation: 'AS' },
    { name: 'Arizona', abbreviation: 'AZ' },
    { name: 'Arkansas', abbreviation: 'AR' },
    { name: 'California', abbreviation: 'CA' },
    { name: 'Colorado', abbreviation: 'CO' },
    { name: 'Connecticut', abbreviation: 'CT' },
  ];

  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );
  spellcheckhint: BehaviorSubject<any>;

  constructor(
    private fb: FormBuilder,
    private breakpointObserver: BreakpointObserver,
    private mySpellcheck: SpellchekerService
  ) {
    this.spellcheckhint = this.mySpellcheck.suggestionValue;
  }

  ngOnInit(): void { }

  ngAfterViewInit(): void {
    let value = '';
    const formValue = this.addressForm.valueChanges;

    this.spellcheckSubscription = formValue
      .pipe(
        pluck('company'),
        debounceTime(500),
        distinctUntilChanged(),
        switchMap((data) => {
          value = data;
          this.mySpellcheck.checkSpell(data);
          return this.mySpellcheck.suggestionValue;
        })
      )
      .subscribe(() => { });

    this.spellcheckSubService = this.mySpellcheck.suggestionValue.subscribe((res) => {
      console.log(res);
      if (res !== null && typeof res !== 'undefined' && res.length > 0) {
        this.trigger.openMenu();
      } else {
        this.trigger.closeMenu();
      }
    });
  }

  onSubmit(): void {
    if (this.addressForm.valid) {
      alert('Like this app to see the amazing thing');
      this.show = false;
    }
  }

  public selectSuggestions(suggestion: string): any {
    this.suggestedWord = suggestion;
    this.mySpellcheck.suggestionValue.next(null);
  }

  

  ngOnDestroy(): void {
    this.spellcheckSubscription.unsubscribe();
    this.spellcheckSubService.unsubscribe();
  }
}
