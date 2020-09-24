import { Component, ChangeDetectionStrategy, EventEmitter, Output, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { MatRadioChange } from '@angular/material/radio';
import { MatTheme } from '../models/theme';

@Component({
  selector: 'app-matnavigation',
  templateUrl: './matnavigation.component.html',
  styleUrls: ['./matnavigation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MatnavigationComponent implements OnInit {

  @Output()
  readonly themeSwitched = new EventEmitter<string>();

  selectedTheme: string;

  isToggled: boolean = false;

  themos: MatTheme

  matThemes: Array<MatTheme> = [
    new MatTheme('indigo', 'mat-indigo-theme'),
    new MatTheme('purple', 'mat-deep-purple-theme'),
    new MatTheme('pink', 'mat-pink-blue-theme'),
  ]

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver) {

  }
  ngOnInit(): void {
    this.themos = this.matThemes[0];
  }

  themeChanged(event: MatRadioChange) {
    this.themos = event.value;
    if (this.isToggled) {
      this.themeSwitched.emit(this.themos.theme + '-dark');
    } else {
      this.themeSwitched.emit(this.themos.theme);
    }
    console.log(event.value)
  }

  onDarkModeSwitched(togglechange: MatSlideToggleChange) {
    this.isToggled = togglechange.checked;
    if (togglechange.checked) {
      this.themeSwitched.emit(this.themos.theme + '-dark');
    } else {
      this.themeSwitched.emit(this.themos.theme);
    }
  }

}
