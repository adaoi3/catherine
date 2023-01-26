import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { AppSettings } from "../global-constants/app.settings";
import { map, Observable } from "rxjs";
import { BookingDto } from "../interfaces/booking-dto";
import { Booking } from "../interfaces/booking";
import { DateTime } from "luxon";

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  constructor(private http: HttpClient) {
  }

  createBooking(bookingDto: BookingDto): Observable<Booking> {
    return this.http.post<Booking>(AppSettings.API_ENDPOINT + '/booking', bookingDto);
  }

  getBookings(): Observable<Booking[]> {
    return this.http.get<BookingDto[]>(AppSettings.API_ENDPOINT + '/booking').pipe(
      map(response => response.map(bookingDto => {
        return {
          id: bookingDto.id,
          userId: bookingDto.userId,
          personCount: bookingDto.personCount,
          roomType: bookingDto.roomType,
          stayTimeStart: bookingDto.stayTimeStart ? DateTime.fromISO(bookingDto.stayTimeStart) : undefined,
          stayTimeEnd: bookingDto.stayTimeEnd ? DateTime.fromISO(bookingDto.stayTimeEnd) : undefined,
          bookingDate: bookingDto.bookingDate ? DateTime.fromISO(bookingDto.bookingDate) : undefined
        };
      }))
    )
  }

}
