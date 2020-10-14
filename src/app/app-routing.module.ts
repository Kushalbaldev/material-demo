import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppFeatureComponent } from './app-feature/app-feature.component';
import { ViewNames } from './commons/viewnames';
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
    path: ViewNames.DEFAULT_VIEW,
    redirectTo: ViewNames.LOGIN_VIEW,
    pathMatch: 'full'
  },

  {
    path: ViewNames.LOGIN_VIEW,
    component: LoginComponent
  },
  {
    path: ViewNames.SIGNUP_VIEW,
    component: SignupComponent
  },

  {
    path: ViewNames.MAIN_VIEW,
    component: MatnavigationComponent,
    canActivate: [GuardGuard],
    children: [
      {
        path: ViewNames.DEFAULT_VIEW,
        redirectTo: ViewNames.DASHBOARD_VIEW,
        pathMatch: 'full'
      },
      {
        path: ViewNames.DASHBOARD_VIEW,
        component: DashboardComponent,
        canActivate: [GuardGuard],
      },
      {
        path: ViewNames.APP_FEATURE_VIEW,
        component: AppFeatureComponent,
        canActivate: [GuardGuard]
      },
      {
        path: ViewNames.USERS_VIEW,
        component: UsersComponent,
        canActivate: [GuardGuard]
      },
      {
        path: ViewNames.PROFILE_VIEW,
        component: ProfileComponent,
        canActivate: [GuardGuard]
      },
      {
        path: ViewNames.FEEDBACK_VIEW,
        component: FeedbackComponent,
        canActivate: [GuardGuard]
      },

      { path: '**', redirectTo: ViewNames.DASHBOARD_VIEW, pathMatch: 'full' }
    ]
  },
  { path: '**', redirectTo: ViewNames.LOGIN_VIEW, pathMatch: 'full' }

];




@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
