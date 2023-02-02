import { Component, OnInit } from '@angular/core';
import { Booking } from "../../interfaces/booking";
import { BookingService } from "../../services/booking.service";
import { STATUS_TYPES } from "../../interfaces/status.constants";
import { MatSelectChange } from "@angular/material/select";

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.component.html',
  styleUrls: ['./bookings.component.scss']
})
export class BookingsComponent implements OnInit {

  bookings: Booking[] = [];

  statusTypesArray = Object.values(STATUS_TYPES);
  public statusTypes = STATUS_TYPES;
  selectedStatus = this.statusTypesArray[0];

  constructor(
    private bookingService: BookingService
  ) {
  }

  ngOnInit(): void {
    this.bookingService.getBookingsByStatus(STATUS_TYPES.PENDING).subscribe({
      next: bookings => this.bookings = bookings,
      error: error => console.error(error)
    })
  }

  getDisplayedColumns(): string[] {
    if (this.selectedStatus === STATUS_TYPES.BOOKED) {
      return ['id', 'userId', 'personCount', 'roomType', 'stayTimeStart',
        'stayTimeEnd', 'bookingDate', 'adminId', 'roomId'];
    }
    if (this.selectedStatus === STATUS_TYPES.DECLINED) {
      return ['id', 'userId', 'personCount', 'roomType', 'stayTimeStart',
        'stayTimeEnd', 'bookingDate', 'adminId'];
    }
    return ['id', 'userId', 'personCount', 'roomType', 'stayTimeStart',
      'stayTimeEnd', 'bookingDate'];
  }

  doSomething($event: MatSelectChange) {
    if ($event.value === STATUS_TYPES.PENDING) {
      this.bookingService.getBookingsByStatus(STATUS_TYPES.PENDING).subscribe({
        next: bookings => this.bookings = bookings,
        error: error => console.error(error)
      })
    }
    if ($event.value === STATUS_TYPES.BOOKED) {
      this.bookingService.getBookingsByStatus(STATUS_TYPES.BOOKED).subscribe({
        next: bookings => this.bookings = bookings,
        error: error => console.error(error)
      })
    }
    if ($event.value === STATUS_TYPES.DECLINED) {
      this.bookingService.getBookingsByStatus(STATUS_TYPES.DECLINED).subscribe({
        next: bookings => this.bookings = bookings,
        error: error => console.error(error)
      })
    }
  }

}
