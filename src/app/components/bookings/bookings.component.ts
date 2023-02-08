import { Component, OnInit } from '@angular/core';
import { Booking } from "../../interfaces/booking";
import { BookingService } from "../../services/booking.service";
import { STATUS_TYPES } from "../../interfaces/status.constants";
import { MatSelectChange } from "@angular/material/select";
import { AuthService } from "../../services/auth.service";
import { ConfirmDialogComponent } from "../confirm-dialog/confirm-dialog.component";
import { MatDialog } from "@angular/material/dialog";
import { ConfirmBookingDto } from "../../interfaces/confirm-booking.dto";

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
    public dialog: MatDialog,
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
      'stayTimeEnd', 'bookingDate', 'actions'];
  }

  getBookingsBySelectedStatus($event: MatSelectChange): void {
    this.bookingService.getBookingsByStatus($event.value).subscribe({
      next: bookings => this.bookings = bookings,
      error: error => console.error(error)
    })
  }

  confirmBooking(booking: Booking): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Approve Booking',
        message: 'Please, choose room number:'
      },
    });

    const convertToConfirmBookingDto = (book: Booking): ConfirmBookingDto => {
      return {
        roomId: 2,
        status: STATUS_TYPES.BOOKED
      } as ConfirmBookingDto
    }
    let convertedConfirmBookingDto = convertToConfirmBookingDto(booking);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.bookingService.confirmBooking(convertedConfirmBookingDto, booking.id).subscribe({
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
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Decline Booking',
        message: 'Are you sure you want to decline booking?'
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.bookingService.declineBooking(bookingId).subscribe({
            complete: () => {
              location.reload();
            }
          }
        );
      }
    });
  }

}
