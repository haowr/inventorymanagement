import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AuthGuard } from './guards/auth.guard';
import { AdminGuard} from './guards/admin.guard';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts/ng2-charts';   
import { ClientsComponent } from './components/components/clients/clients.component';
import { HomeComponent } from './components/home/home.component';
import { HomeComponent2 } from './components/components/home2/home2.component';
import { DataService } from './services/data.service';
import { ValidateService } from './services/validate.service';
import { ClientService } from './services/client.service';
import { WeatherService } from './services/weather.service';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes, ActivatedRoute, Params,PreloadAllModules } from '@angular/router';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { EachClientComponent } from './components/each-client/each-client.component';
import { AuthService } from './services/auth.service';
import { LocationComponent } from './components/location/location.component';
import { EachLocationComponent } from './components/each-location/each-location.component';
import { NewcomponentComponent } from './components/newcomponent/newcomponent.component';
import { NewclientComponent } from './components/newclient/newclient.component';
import { InventoryComponent } from './components/inventory/inventory.component';
import { ManagementComponent } from './components/management/management.component';
import { RemoveclientComponent } from './components/removeclient/removeclient.component';
import { EditComponent } from './edit/edit.component';
import { EditclientComponent } from './editclient/editclient.component';
import { AboutComponent } from './components/about/about.component';
import { ServiceComponent } from './components/service/service.component';
import { EmploymentComponent } from './components/employment/employment.component';
import { ContactComponent } from './components/contact/contact.component';
import { AdminComponent } from './components/admin/admin.component';

const appRoutes: Routes = [

  { path: '', component: HomeComponent2 },
  { path: 'about', component: AboutComponent},
  { path: 'services',component: ServiceComponent},
  { path: 'employment', component: EmploymentComponent},
  { path: 'contact', component: ContactComponent},
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'clients',component:ClientsComponent,
    canActivate: [AuthGuard],
    data: { preload: true }
  },

  { path: 'clients/:client', component: EachClientComponent,canActivate:[AuthGuard] },
  { path: 'clients/:client/:location', component: LocationComponent,canActivate:[AuthGuard]},
  { path: 'clients/:client/:location/:supplier/:productcode', component: InventoryComponent,canActivate:[AuthGuard]},
  { path: 'register/newclient', component: NewclientComponent,canActivate:[AuthGuard]},
  { path: 'remove', component: RemoveclientComponent,canActivate:[AuthGuard]},
  { path: 'edit', component: EditclientComponent, canActivate:[AuthGuard]},
  { path: 'management', component: AdminComponent, canActivate:[AdminGuard]}

]

@NgModule({
  declarations: [

    AppComponent,
    ClientsComponent,
    HomeComponent,
    HomeComponent2,
    RegisterComponent,
    LoginComponent,
    NavbarComponent,
    EachClientComponent,
    LocationComponent,
    EachLocationComponent,
    NewcomponentComponent,
    NewclientComponent,
    InventoryComponent,
    ManagementComponent,
    RemoveclientComponent,
    EditComponent,
    EditclientComponent,
    AboutComponent,
    EmploymentComponent,
    ContactComponent,
    ServiceComponent,
    AdminComponent
    
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),
    ChartsModule
    ],

  providers: [DataService, ValidateService, AuthService,ClientService, AuthGuard, WeatherService,AdminGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
