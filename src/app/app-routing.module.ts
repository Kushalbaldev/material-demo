import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { MatnavigationComponent } from './matnavigation/matnavigation.component';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent
  },

  {
    path: 'main-view',
    component: MatnavigationComponent
  }


];




@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
