import { Component, OnInit } from '@angular/core';
import { Booking } from "../../interfaces/booking";
import { AuthService } from "../../services/auth.service";
import { STATUS_TYPES } from "../../interfaces/status.constants";
import { BookingService } from "../../services/booking.service";
import {
  BookingDeclineDialogComponent
} from "../booking-decline-dialog/booking-decline-dialog.component";
import { MatDialog } from "@angular/material/dialog";

@Component({
  selector: 'app-user-bookings',
  templateUrl: './user-bookings.component.html',
  styleUrls: ['./user-bookings.component.scss']
})
export class UserBookingsComponent implements OnInit {

  allBookings: Booking[] = [];
  pendingBookings: Booking[] = [];
  bookedBookings: Booking[] = [];
  declinedBookings: Booking[] = [];
  pendingBookingsDisplayedColumns: string[] = ['id', 'userId', 'personCount', 'roomType',
    'stayTimeStart', 'stayTimeEnd', 'bookingDate', 'actions'];
  bookedBookingsDisplayedColumns: string[] = ['id', 'userId', 'personCount', 'roomType',
    'stayTimeStart', 'stayTimeEnd', 'bookingDate', 'adminId', 'roomId'];
  declinedBookingsDisplayedColumns: string[] = ['id', 'userId', 'personCount', 'roomType',
    'stayTimeStart', 'stayTimeEnd', 'bookingDate', 'adminId'];

  constructor(
    public authService: AuthService,
    private bookingService: BookingService,
    public dialog: MatDialog
  ) {
  }

  ngOnInit(): void {
    this.bookingService.getByUserId(this.authService.getCurrentUserId()).subscribe({
      next: bookings => {
        this.allBookings = bookings
        this.pendingBookings = bookings.filter(bookings => bookings.status === STATUS_TYPES.PENDING)
        this.bookedBookings = bookings.filter(bookings => bookings.status === STATUS_TYPES.BOOKED)
        this.declinedBookings = bookings.filter(bookings => bookings.status === STATUS_TYPES.DECLINED)
      },
      error: error => console.error(error)
    })
  }

  cancelBooking(bookingId: number): void {
    const dialogRef = this.dialog.open(BookingDeclineDialogComponent, {
      data: {
        title: 'Cancel Booking',
        message: 'Are you sure you want to cancel your booking?'
      },
    });

    dialogRef.afterClosed().subscribe(decline => {
      if (decline) {
        this.bookingService.delete(bookingId).subscribe({
            error: err => console.error(err),
            complete: () => {
              location.reload();
            }
          }
        );
      }
    });
  }

}
