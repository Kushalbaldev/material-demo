import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocalechangeService {

  constructor() { }

  selectedLang=new BehaviorSubject('en');
}
