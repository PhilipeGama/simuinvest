import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpClientModule } from '@angular/common/http';

import { CurrencyMaskModule } from "ng2-currency-mask";



import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SimulatorComponent } from './pages/simulator/simulator.component';
import { ChartBarComponent } from './components/chart-bar/chart-bar.component';


//material 
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatSliderModule } from '@angular/material/slider';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu'; 
import {MatRadioModule} from '@angular/material/radio'; 
import {MatCardModule} from '@angular/material/card'; 

import {
  MatSidenavModule
} from '@angular/material/sidenav';

import { NgApexchartsModule } from 'ng-apexcharts';

import { LoginComponent } from './pages/login/login.component';
import { SimulationReportComponent } from './components/simulation-report/simulation-report.component';
import { EditProfileComponent } from './pages/edit-profile/edit-profile.component';
import { HeaderComponent } from './components/templates/header/header.component';
import { LoggedComponent } from './pages/logged/logged.component';
import { InvestorProfileComponent } from './pages/investor-profile/investor-profile.component';

import { HomeComponent } from './pages/home/home.component';
import { LoadingSpinner } from './components/templates/loading-spinner/loading-spinner';
import { TutorialComponent } from './tutorial/tutorial.component';

@NgModule({
  declarations: [
    AppComponent,
    SimulatorComponent,
    ChartBarComponent,
    LoginComponent,
    SimulationReportComponent,
    HeaderComponent,
    LoggedComponent,
    InvestorProfileComponent,
    HomeComponent,
    LoadingSpinner,
    EditProfileComponent,
    TutorialComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    CurrencyMaskModule,
    FlexLayoutModule,
    NgApexchartsModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSliderModule,
    MatSelectModule,
    MatButtonModule,
    MatTableModule,
    MatIconModule,
    MatToolbarModule,
    MatSidenavModule,
    MatMenuModule,
    MatRadioModule,
    MatCardModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
