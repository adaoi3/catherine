import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { ConfirmDialogData } from "../../interfaces/confirm-dialog.data";

@Component({
  selector: 'app-booking-decline-dialog',
  templateUrl: './booking-decline-dialog.component.html',
  styleUrls: ['./booking-decline-dialog.component.scss']
})
export class BookingDeclineDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<BookingDeclineDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ConfirmDialogData
  ) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
