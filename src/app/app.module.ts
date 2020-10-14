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
import { ProfileComponent } from './profile/profile.component';
import { SignupComponent } from './signup/signup.component';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from 'src/environments/environment';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { ConfirmDialogueComponent } from './confirm-dialogue/confirm-dialogue.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { AppRolesDirective } from './app-roles.directive';


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
    UsersComponent,
    ProfileComponent,
    SignupComponent,
    ConfirmDialogueComponent,
    FeedbackComponent,
    AppRolesDirective,
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
    FlexLayoutModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule, // firestore
    AngularFireAuthModule, // auth
    AngularFireStorageModule, MatTableModule, MatPaginatorModule, MatSortModule // storage
  ],
  providers: [SpellCheckerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
