import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InvestorProfileComponent } from './pages/investor-profile/investor-profile.component';
import { LoggedComponent } from './pages/logged/logged.component';
import { LoginComponent } from './pages/login/login.component';

const routes: Routes = [
  {
    path: 'simulator',
    component: LoggedComponent
  },
  {
    path: '',
    component: LoginComponent
  },
  {
    path: 'investor-profile',
    component: InvestorProfileComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
