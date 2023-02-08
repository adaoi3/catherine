import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from "./components/home/home.component";
import { NotFoundComponent } from "./components/not-found/not-found.component";
import { LogInComponent } from "./components/log-in/log-in.component";
import { CreateBookingComponent } from "./components/create-booking/create-booking.component";
import { BookingsComponent } from "./components/bookings/bookings.component";
import { PermissionGuard } from "./guard/permission-guard.service";
import { RolesForPermission } from "./interfaces/roles-for-permission";
import { ROLE } from "./interfaces/role.constants";

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'log-in', component: LogInComponent },
  { path: 'create-booking', component: CreateBookingComponent },
  {
    path: 'bookings', component: BookingsComponent,
    data: { allowedRoles: [ROLE.ADMIN] } as RolesForPermission,
    canActivate: [PermissionGuard]
  },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [PermissionGuard]
})
export class AppRoutingModule { }
