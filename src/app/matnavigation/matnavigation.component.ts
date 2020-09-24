import { Component, ChangeDetectionStrategy, EventEmitter, Output, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { MatTheme } from '../models/theme';
import { ThemeService } from '../theme.service';

@Component({
  selector: 'app-matnavigation',
  templateUrl: './matnavigation.component.html',
  styleUrls: ['./matnavigation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MatnavigationComponent implements OnInit {

  selectedTheme: string;

  isToggled: boolean = false;

  themos: MatTheme

  matThemes: Array<MatTheme>;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver, private _themeService: ThemeService) {
    this.matThemes = this._themeService.getMatThemes();
  }

  ngOnInit(): void {
    this.themos = this.matThemes[0];
  }

  themeChanged() {
    this.changeTheme();
  }

  onDarkModeSwitched(togglechange: MatSlideToggleChange) {
    this.isToggled = togglechange.checked;
    this.changeTheme();
  }

  private changeTheme() {
    if (this.isToggled) {
      this._themeService.themechangerSubject.next(this.themos.theme + '-dark');
    } else {
      this._themeService.themechangerSubject.next(this.themos.theme);
    }
  }
}
