import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LocalechangeService } from '../localechange.service';

@Component({
  selector: 'app-localechange',
  templateUrl: './localechange.component.html',
  styleUrls: ['./localechange.component.scss']
})
export class LocalechangeComponent implements OnInit {
  switchLang: string;
  browserLang: any;

  constructor(public translate: TranslateService, private localeChangeService: LocalechangeService) {
    this.localeChangeService.selectedLang.subscribe(res => {
      this.switchLang = res;
    });

    translate.addLangs(['de', 'en']);
    translate.setDefaultLang('en');
    this.browserLang = translate.getDefaultLang();
    this.languageChanged();
    this.localeChangeService.selectedLang.next(this.browserLang);

  }

  ngOnInit(): void {

  }


  languageChanged(): any{
    this.translate.use(this.browserLang.match(/de|en/) ? this.browserLang : 'en')
  }

  selectedLanguage(lang: string): any {
    this.localeChangeService.selectedLang.next(lang);
    this.translate.use(lang);
  }

}
