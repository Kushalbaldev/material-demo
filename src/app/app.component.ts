import { Component, Inject, OnInit, Renderer2 } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { ThemeService } from './theme.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

  constructor(@Inject(DOCUMENT) private document:Document,private renderer:Renderer2 ,private _themeService:ThemeService){}

  ngOnInit(): void {
    this._themeService.themechangerSubject.subscribe(res=>{
      this.renderer.setAttribute(this.document.body,'class',res);
    }); 
  }
}
