import { Component, Inject, OnInit, Renderer2 } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

  constructor(@Inject(DOCUMENT) private document:Document,private renderer:Renderer2 ){}

  ngOnInit(): void {
    this.renderer.setAttribute(this.document.body,'class','mat-indigo-theme');
  }

  themeSwitch(theme:string){
    this.renderer.setAttribute(this.document.body,'class',theme);
  }
}
