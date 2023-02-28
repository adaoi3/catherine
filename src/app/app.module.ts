import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './components/home/home.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { LogInComponent } from './components/log-in/log-in.component';
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatInputModule } from "@angular/material/input";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { CreateBookingComponent } from './components/create-booking/create-booking.component';
import { MatLuxonDateModule } from "@angular/material-luxon-adapter";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatListModule } from "@angular/material/list";
import { MatRadioModule } from "@angular/material/radio";
import { AddTokenHeaderInterceptor } from "./interceptors/add-token-header.interceptor";
import { BookingsComponent } from './components/bookings/bookings.component';
import { MatTableModule } from "@angular/material/table";
import { CommonModule } from "@angular/common";
import { MatButtonToggleModule } from "@angular/material/button-toggle";
import { MatSelectModule } from "@angular/material/select";
import { CapitalizedWordPipe } from './pipes/capitalized-word.pipe';
import { BookingApproveDialogComponent } from './components/booking-approve-dialog/booking-approve-dialog.component';
import { MatDialogModule } from "@angular/material/dialog";
import { BookingDeclineDialogComponent } from './components/booking-decline-dialog/booking-decline-dialog.component';
import { UserBookingsComponent } from './components/user-bookings/user-bookings.component';
import { SuccessfulBookingComponent } from './components/successful-booking/successful-booking.component';
import { UnauthorizedInterceptor } from "./interceptors/unauthorized.interceptor";

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
    HomeComponent,
    NavBarComponent,
    NotFoundComponent,
    LogInComponent,
    CreateBookingComponent,
    BookingsComponent,
    CapitalizedWordPipe,
    BookingApproveDialogComponent,
    BookingDeclineDialogComponent,
    UserBookingsComponent,
    SuccessfulBookingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatButtonModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    BrowserAnimationsModule,
    MatLuxonDateModule,
    HttpClientModule,
    MatDatepickerModule,
    MatListModule,
    MatRadioModule,
    FormsModule,
    MatTableModule,
    CommonModule,
    MatButtonToggleModule,
    MatSelectModule,
    MatDialogModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: UnauthorizedInterceptor,
      multi: true,
    },
    {
    provide: HTTP_INTERCEPTORS,
    useClass: AddTokenHeaderInterceptor,
    multi: true,
  }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
