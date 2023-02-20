import { Component, OnInit } from '@angular/core';
import { Booking } from "../../interfaces/booking";
import { BookingService } from "../../services/booking.service";
import { STATUS_TYPES } from "../../interfaces/status.constants";
import { MatSelectChange } from "@angular/material/select";
import { AuthService } from "../../services/auth.service";
import {
  BookingApproveDialogComponent
} from "../booking-approve-dialog/booking-approve-dialog.component";
import { MatDialog } from "@angular/material/dialog";
import { ConfirmBookingDto } from "../../interfaces/confirm-booking.dto";
import {
  BookingDeclineDialogComponent
} from "../booking-decline-dialog/booking-decline-dialog.component";

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
    private bookingService: BookingService,
    public authService: AuthService,
    public dialog: MatDialog
  ) {
  }

  ngOnInit(): void {
    this.bookingService.getByStatus(STATUS_TYPES.PENDING).subscribe({
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
      'stayTimeEnd', 'bookingDate', 'actions'];
  }

  getBookingsBySelectedStatus($event: MatSelectChange): void {
    this.bookingService.getByStatus($event.value).subscribe({
      next: bookings => this.bookings = bookings,
      error: error => console.error(error)
    })
  }

  confirmBooking(booking: Booking): void {
    const dialogRef = this.dialog.open(BookingApproveDialogComponent, {
      data: {
        title: 'Approve Booking',
        message: 'Please, choose room number:',
        booking: booking
      },
    });

    dialogRef.afterClosed().subscribe(availableRoom => {
      if (availableRoom) {
        let confirmBookingDto = {
          roomId: availableRoom,
          status: STATUS_TYPES.BOOKED
        } as ConfirmBookingDto
        this.bookingService.confirm(confirmBookingDto, booking.id).subscribe({
            error: error => console.error(error),
            complete: () => {
              location.reload();
            },
          }
        );
      }
    });
  }

  declineBooking(bookingId: number): void {
    const dialogRef = this.dialog.open(BookingDeclineDialogComponent, {
      data: {
        title: 'Decline Booking',
        message: 'Are you sure you want to decline booking?'
      },
    });

    dialogRef.afterClosed().subscribe(decline => {
      if (decline) {
        this.bookingService.decline(bookingId).subscribe({
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
