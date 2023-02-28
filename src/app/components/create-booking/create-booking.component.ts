import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormGroupDirective,
  Validators
} from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { DateTime } from "luxon";
import { BookingService } from "../../services/booking.service";
import { AuthService } from "../../services/auth.service";
import { ROOM_TYPES } from "../../interfaces/room-type.constants";

@Component({
  selector: 'app-booking',
  templateUrl: './create-booking.component.html',
  styleUrls: ['./create-booking.component.scss']
})
export class CreateBookingComponent {

  roomType: string[] = ROOM_TYPES.ALL_ROOM_TYPES;
  datepickerFilter = (d: Date | null): boolean => {
    const day = (d || new Date()).getDay();
    return day !== 0 && day !== 6;
  };
  minDate = new Date();
  maxDate = new Date(new Date().getFullYear() + 3, 11, 31);

  booking = this.formBuilder.group({
    id: 0,
    userId: this.authService.getCurrentUserId(),
    personCount: new FormControl(1, [
      Validators.required,
      Validators.min(1),
      Validators.max(5)
    ]),
    roomType: new FormControl('Standard', [
      Validators.required
    ]),
    bookingDate: new FormControl(DateTime.now(), [
      Validators.required
    ]),
  }, {
    validators: []
  });

  stayTime = new FormGroup({
    start: new FormControl<DateTime | null>(null),
    end: new FormControl<DateTime | null>(null),
  });

  constructor(
    private bookingService: BookingService,
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private activatedRoute: ActivatedRoute
  ) {
  }

  getErrorMessage(formControl: FormControl) {
    if (formControl.hasError('required')) {
      return 'You must enter a value';
    }
    if (formControl.hasError('minlength')) {
      return 'Not enough characters entered';
    }
    if (formControl.hasError('maxlength')) {
      return 'Too many characters';
    }
    if (formControl.hasError('uniqueLogin')) {
      return 'Not unique login';
    }
    if (formControl.hasError('min') || formControl.hasError('max')) {
      return 'must be between 1 and 5';
    }
    return formControl.hasError('email') ? 'Not a valid email' : 'Unknown error';
  }

  onSubmit(formDirective: FormGroupDirective): void {
    if (this.booking.valid) { /*todo handle issue if user creates booking*/
      this.bookingService.create({ /*todo with expired token*/
        userId: this.booking.value.userId || 0,
        personCount: this.booking.value.personCount || 0,
        roomType: this.booking.value.roomType || 'Standard',
        stayTimeStart: this.stayTime.value.start?.toISODate(),
        stayTimeEnd: this.stayTime.value.end?.toISODate()
      }).subscribe(() => {
        this.booking.reset();
        formDirective.resetForm();
        if (this.authService.isUser()) {
          this.router.navigate(['../successful-booking'],
            { relativeTo: this.activatedRoute }).then(r => '');
        }
        if (this.authService.isAdmin()) {
          this.router.navigate(['../bookings'],
            { relativeTo: this.activatedRoute }).then(r => '');
        }
      });
    }
  }

}
