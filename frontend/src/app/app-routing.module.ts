import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeaderComponent } from './components/templates/header/header.component';
import { HomeComponent } from './pages/home/home.component';
import { InvestorProfileComponent } from './pages/investor-profile/investor-profile.component';
import { LoggedComponent } from './pages/logged/logged.component';
import { LoginComponent } from './pages/login/login.component';
import { SimulatorComponent } from './pages/simulator/simulator.component';

const routes: Routes = [

  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: '',
    component: LoggedComponent,
    children: [
      {
        path: '',
        component: HomeComponent
      },
      {
        path: 'simulator',
        component: SimulatorComponent
      },
      {
        path: 'edit-profile',
        component: InvestorProfileComponent
      },
      {
        path: 'investor-profile',
        component: InvestorProfileComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
