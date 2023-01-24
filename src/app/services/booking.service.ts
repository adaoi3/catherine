import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { AppSettings } from "../global-constants/app.settings";
import { Observable } from "rxjs";
import { BookingDto } from "../interfaces/booking-dto";
import { Booking } from "../interfaces/booking";

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  constructor(private http: HttpClient) { }

  createBooking(bookingDto: BookingDto): Observable<Booking> {
    return this.http.post<Booking>(AppSettings.API_ENDPOINT + '/booking', bookingDto);
  }

}
