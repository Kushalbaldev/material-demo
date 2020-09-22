import { Component, ChangeDetectionStrategy, EventEmitter, Output, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { MatRadioChange } from '@angular/material/radio';

@Component({
  selector: 'app-matnavigation',
  templateUrl: './matnavigation.component.html',
  styleUrls: ['./matnavigation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MatnavigationComponent implements OnInit {

  @Output()
  readonly themeSwitched = new EventEmitter<string>();

  selectedTheme: string = 'mat-indigo-theme';

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver) {

  }
  ngOnInit(): void {
  }


  matThemes: string[] = ['mat-indigo-theme', 'mat-deep-purple-theme', 'mat-pink-blue-theme'];


  themeChanged(event: MatRadioChange) {
    this.selectedTheme = event.value;
    this.themeSwitched.emit(this.selectedTheme);
  }

  onDarkModeSwitched(togglechange: MatSlideToggleChange) {
    if (togglechange.checked) {
      this.themeSwitched.emit(this.selectedTheme+'-dark');
    } else {
      this.themeSwitched.emit(this.selectedTheme);
    }
  }

}
