import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AppFeatureService } from '../app-feature.service';
import { AppFeature } from '../models/app-feature';

@Component({
  selector: 'app-app-feature',
  templateUrl: './app-feature.component.html',
  styleUrls: ['./app-feature.component.scss']
})
export class AppFeatureComponent implements OnInit {

 public  OAppFeature: Observable<AppFeature[]>;

  constructor(private appFeatureService: AppFeatureService) {}

  ngOnInit(): void {
    this.OAppFeature = this.appFeatureService.getAppFeatures();
  }

}
