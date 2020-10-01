import { Component, OnInit } from '@angular/core';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { MatTheme } from '../models/theme';
import { ThemeService } from '../theme.service';

@Component({
  selector: 'app-themechanger',
  templateUrl: './themechanger.component.html',
  styleUrls: ['./themechanger.component.scss']
})
export class ThemechangerComponent implements OnInit {

  selectedTheme: string;

  isToggled = false;

  themos: MatTheme;

  matThemes: Array<MatTheme>;

  constructor(private themeService: ThemeService) {
    this.matThemes = themeService.getMatThemes();
  }

  ngOnInit(): void {
    this.themos = this.matThemes[0];
  }

  themeChanged(): any {
    this.changeTheme();
  }

  onDarkModeSwitched(togglechange: MatSlideToggleChange): any {
    this.isToggled = togglechange.checked;
    this.changeTheme();
  }

  private changeTheme(): any {
    if (this.isToggled) {
      this.themeService.themechangerSubject.next(this.themos.theme + '-dark');
    } else {
      this.themeService.themechangerSubject.next(this.themos.theme);
    }
  }

}
