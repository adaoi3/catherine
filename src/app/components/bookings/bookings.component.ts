import { Component } from '@angular/core';
import { Booking } from "../../interfaces/booking";
import { BookingService } from "../../services/booking.service";

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.component.html',
  styleUrls: ['./bookings.component.scss']
})
export class BookingsComponent {

  bookings: Booking[] = [];

  displayedColumns: string[] = ['id', 'userId', 'personCount', 'roomType', 'stayTimeStart',
    'stayTimeEnd', 'bookingDate'];

  constructor(
    private bookingService: BookingService
  ) {
  }

  ngOnInit(): void {
    this.bookingService.getBookings().subscribe({
      next: bookings => this.bookings = bookings,
      error: error => console.error(error)
    })
  }

  createHardcodedBookingForTests(): void {
    this.bookingService.createBooking({
      userId: 2,
      personCount: 3,
      roomType: 'Standard',
      stayTimeStart: '2023-02-08',
      stayTimeEnd: '1995-02-10'
    }).subscribe();
  }

}
