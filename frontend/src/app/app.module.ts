import { NgModule } from '@angular/core';
import { MaterialModule } from './material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { CurrencyMaskModule } from "ng2-currency-mask";
import { NgxMaskModule, IConfig } from 'ngx-mask'
export const options: Partial<IConfig> | (() => Partial<IConfig>) = null;

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { NgApexchartsModule } from 'ng-apexcharts';

import { SimulatorComponent } from './pages/simulator/simulator.component';
import { ChartBarComponent } from './components/chart-bar/chart-bar.component';
import { LoginComponent } from './pages/login/login.component';
import { SimulationReportComponent } from './components/simulation-report/simulation-report.component';
import { EditProfileComponent } from './pages/edit-profile/edit-profile.component';
import { HeaderComponent } from './components/header/header.component';
import { LoggedComponent } from './pages/logged/logged.component';
import { InvestorProfileComponent } from './pages/investor-profile/investor-profile.component';
import { HomeComponent } from './pages/home/home.component';
import { LoadingSpinner } from './components/loading-spinner/loading-spinner';
import { RegisterComponent } from './pages/register/register.component';
import { environment } from 'src/environments/environment';
import { DialogMaterialComponent } from './components/dialog-investor-profile/dialog-investor-profile.component';
import { DialogConfirmComponent } from './components/dialog-confirm/dialog-confirm.component';


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
    RegisterComponent,
    DialogMaterialComponent,
    DialogConfirmComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    NgxMaskModule.forRoot(),
    AngularFireDatabaseModule,
    MaterialModule,
    CurrencyMaskModule,
    FlexLayoutModule,
    NgApexchartsModule,
    BrowserAnimationsModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
