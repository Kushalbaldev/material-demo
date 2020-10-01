import { Component, ChangeDetectionStrategy, EventEmitter, Output, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { MatTheme } from '../models/theme';
import { ThemeService } from '../theme.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-matnavigation',
  templateUrl: './matnavigation.component.html',
  styleUrls: ['./matnavigation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MatnavigationComponent implements OnInit {


  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver, private router: Router) {

  }

  ngOnInit(): void {
  }

  logout(): any {
    this.router.navigate(['']);
  }
}
