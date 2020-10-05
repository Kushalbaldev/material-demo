import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppFeature } from './models/app-feature';

@Injectable({
  providedIn: 'root'
})
export class AppFeatureService {

  url = '/assets/data/appFeature.json';

  constructor(private http: HttpClient) {

  }

  getAppFeatures(): Observable<AppFeature[]> {
    return this.http.get<AppFeature[]>(this.url);
  }
}
