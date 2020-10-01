import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { MatTheme } from './models/theme';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  private theme = 'mat-indigo-theme';

  private matThemes: Array<MatTheme> = [
    new MatTheme('indigo', 'mat-indigo-theme'),
    new MatTheme('purple', 'mat-deep-purple-theme'),
    new MatTheme('pink', 'mat-pink-blue-theme'),
  ];

  public themechangerSubject = new BehaviorSubject(this.theme);

  constructor() { }

  public getMatThemes(): any {
    return this.matThemes;
  }
}
