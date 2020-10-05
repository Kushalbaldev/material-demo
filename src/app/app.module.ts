import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MatnavigationComponent } from './matnavigation/matnavigation.component';
import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { AddressFormComponent } from './address-form/address-form.component';
import { LocalechangeComponent } from './localechange/localechange.component';
import { LangTranslateModule } from './translate/lang-translate.module';
import { MaterialModule } from './material/material.module';
import { SpellCheckerModule, SpellCheckerService } from 'ngx-spellchecker';
import { AppFeatureComponent } from './app-feature/app-feature.component';
import { ThemechangerComponent } from './themechanger/themechanger.component';
import { UsersComponent } from './users/users.component';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [
    AppComponent,
    MatnavigationComponent,
    DashboardComponent,
    AddressFormComponent,
    LoginComponent,
    LocalechangeComponent,
    AppFeatureComponent,
    ThemechangerComponent,
    UsersComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    RxReactiveFormsModule,
    LangTranslateModule,
    SpellCheckerModule,
    FlexLayoutModule
  ],
  providers: [SpellCheckerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
