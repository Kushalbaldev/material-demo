import { Component, ChangeDetectionStrategy, EventEmitter, Output, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AuthService } from '../auth.service';

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

  constructor(private breakpointObserver: BreakpointObserver, private authService: AuthService) {

  }

  ngOnInit(): void {
  }

  logout(): any {
    this.authService.logout();
  }
}
