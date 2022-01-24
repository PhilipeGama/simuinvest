import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { InvestorProfileComponent } from './pages/investor-profile/investor-profile.component';
import { LoggedComponent } from './pages/logged/logged.component';
import { LoginComponent } from './pages/login/login.component';
import { SimulatorComponent } from './pages/simulator/simulator.component';

const routes: Routes = [
  {
    path: 'simulator',
    component: SimulatorComponent
  },
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'investor-profile',
    component: InvestorProfileComponent
  },
  {
    path: 'login',
    component: LoginComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
