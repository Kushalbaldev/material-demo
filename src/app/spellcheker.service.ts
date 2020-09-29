import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SpellCheckerService } from 'ngx-spellchecker';
import { BehaviorSubject, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpellchekerService {

  fileURL = "https://raw.githubusercontent.com/JacobSamro/ngx-spellchecker/master/dict/normalized_en-US.dic";

  public suggestionValue= new BehaviorSubject(null);

  constructor(private httpClient:HttpClient,private spellCheckerService: SpellCheckerService) { }

  public checkSpell(wordTocheck:string):any{
    this.httpClient.get(this.fileURL, { responseType: 'text' }).subscribe((res: any) => {
      let dictionary = this.spellCheckerService.getDictionary(res)
      if(!dictionary.spellCheck(wordTocheck)){
        this.suggestionValue.next(dictionary.getSuggestions(wordTocheck,null,null));
      }
    });
  }
}
