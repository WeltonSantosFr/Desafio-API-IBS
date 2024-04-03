import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { UsersComponent } from './components/users/users.component';
import { AddressComponent } from './components/address/address.component';


export const routes: Routes = [
    {path: "", component:LoginComponent,},
    {path: "dashboard", component:DashboardComponent},
    {path: "users", component:UsersComponent},
    {path: "address", component:AddressComponent}

];
