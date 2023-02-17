import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { AppSettings } from "../global-constants/app.settings";
import { Room } from "../interfaces/room";
import { Booking } from "../interfaces/booking";
import { STATUS_TYPES } from "../interfaces/status.constants";

@Injectable({
  providedIn: 'root'
})
export class RoomService {

  constructor(private http: HttpClient) { }

  getAvailableRooms(booking: Booking): Observable<Room[]> {
    return this.http.get<Room[]>(AppSettings.API_ENDPOINT + '/rooms/available', {
      params: {
        stayTimeStart: booking.stayTimeStart?.toISODate() || '',
        stayTimeEnd: booking.stayTimeEnd?.toISODate() || '',
        roomType: booking.roomType,
        status: STATUS_TYPES.BOOKED
      }
    })
  }

}
