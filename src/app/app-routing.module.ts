import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppFeatureComponent } from './app-feature/app-feature.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { GuardGuard } from './guard.guard';
import { LoginComponent } from './login/login.component';
import { MatnavigationComponent } from './matnavigation/matnavigation.component';
import { ProfileComponent } from './profile/profile.component';
import { SignupComponent } from './signup/signup.component';
import { UsersComponent } from './users/users.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },

  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'signup',
    component: SignupComponent
  },

  {
    path: 'main-view',
    component: MatnavigationComponent,
    canActivate: [GuardGuard],
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      },
      {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [GuardGuard],
      },
      {
        path: 'app-feature',
        component: AppFeatureComponent,
        canActivate: [GuardGuard]
      },
      {
        path: 'users',
        component: UsersComponent,
        canActivate: [GuardGuard]
      },
      {
        path: 'profile',
        component: ProfileComponent,
        canActivate: [GuardGuard]
      },
      {
        path: 'feedback',
        component: FeedbackComponent,
        canActivate: [GuardGuard]
      },

      { path: '**', redirectTo: 'dashboard', pathMatch: 'full' }
    ]
  },
  { path: '**', redirectTo: 'login', pathMatch: 'full' }


];




@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
