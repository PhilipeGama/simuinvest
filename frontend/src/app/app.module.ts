import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpClientModule } from '@angular/common/http';

import { CurrencyMaskModule } from "ng2-currency-mask";

import { NgxMaskModule, IConfig } from 'ngx-mask'
export const options: Partial<IConfig> | (() => Partial<IConfig>) = null;

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SimulatorComponent } from './pages/simulator/simulator.component';
import { ChartBarComponent } from './components/chart-bar/chart-bar.component';

import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';

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
import { MatMenuModule } from '@angular/material/menu';
import { MatRadioModule } from '@angular/material/radio';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import {MatDialogModule} from '@angular/material/dialog';



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
    TutorialComponent,
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
    MatCardModule,
    MatSnackBarModule,
    MatDialogModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
