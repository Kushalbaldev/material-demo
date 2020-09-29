import { Component, Inject, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { ThemeService } from './theme.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  private themeSubscription: Subscription;

  constructor(@Inject(DOCUMENT) private document: Document, private renderer: Renderer2, private _themeService: ThemeService) { }

  ngOnInit(): void {
    this.themeSubscription = this._themeService.themechangerSubject.subscribe(res => {
      this.renderer.setAttribute(this.document.body, 'class', res);
    });
  }

  ngOnDestroy(): void {
    this.themeSubscription.unsubscribe();
  }
}
