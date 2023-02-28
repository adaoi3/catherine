import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";
import { AppSettings } from "../global-constants/app.settings";
import { map, Observable } from "rxjs";
import { BookingDto } from "../interfaces/booking.dto";
import { Booking } from "../interfaces/booking";
import { DateTime } from "luxon";
import { ConfirmBookingDto } from "../interfaces/confirm-booking.dto";
import { STATUS_TYPES } from "../interfaces/status.constants";

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  constructor(private http: HttpClient) {
  }

  create(bookingDto: BookingDto): Observable<Booking> {
    return this.http.post<Booking>(AppSettings.API_ENDPOINT + '/bookings', bookingDto);
  }

  getByStatus(statusName: string): Observable<Booking[]> {
    let queryParams = new HttpParams();
    queryParams = queryParams.append('statusName', statusName);
    return this.http.get<BookingDto[]>(AppSettings.API_ENDPOINT + '/bookings', {
      params: queryParams
    }).pipe(
      map(response => response.map(bookingDto => {
        return {
          id: bookingDto.id,
          userId: bookingDto.userId,
          personCount: bookingDto.personCount,
          roomType: bookingDto.roomType,
          stayTimeStart: bookingDto.stayTimeStart ? DateTime.fromISO(bookingDto.stayTimeStart) : undefined,
          stayTimeEnd: bookingDto.stayTimeEnd ? DateTime.fromISO(bookingDto.stayTimeEnd) : undefined,
          bookingDate: bookingDto.bookingDate ? DateTime.fromISO(bookingDto.bookingDate) : undefined,
          adminId: bookingDto.adminId,
          roomId: bookingDto.roomId,
          status: bookingDto.status
        };
      }))
    )
  }

  getByUserId(UserId: number): Observable<Booking[]> {
    return this.http.get<BookingDto[]>(`${AppSettings.API_ENDPOINT}/bookings/${UserId}`).pipe(
      map(response => response.map(bookingDto => {
        return {
          id: bookingDto.id,
          userId: bookingDto.userId,
          personCount: bookingDto.personCount,
          roomType: bookingDto.roomType,
          stayTimeStart: bookingDto.stayTimeStart ? DateTime.fromISO(bookingDto.stayTimeStart) : undefined,
          stayTimeEnd: bookingDto.stayTimeEnd ? DateTime.fromISO(bookingDto.stayTimeEnd) : undefined,
          bookingDate: bookingDto.bookingDate ? DateTime.fromISO(bookingDto.bookingDate) : undefined,
          adminId: bookingDto.adminId,
          roomId: bookingDto.roomId,
          status: bookingDto.status
        };
      }))
    )
  }

  confirm(confirmBookingDto: ConfirmBookingDto, bookingId?: number) {
    return this.http.post<Booking>(`${AppSettings.API_ENDPOINT}/bookings/${bookingId}/confirm`,
      confirmBookingDto);
  }

  decline(id: number) {
    return this.http.post(`${AppSettings.API_ENDPOINT}/bookings/${id}/decline`,
      STATUS_TYPES.DECLINED);
  }

  delete(id: number) {
    return this.http.delete(`${AppSettings.API_ENDPOINT}/bookings/${id}`)
  }

}
