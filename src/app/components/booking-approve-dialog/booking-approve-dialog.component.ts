import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { ConfirmDialogData } from "../../interfaces/confirm-dialog.data";
import { RoomService } from "../../services/room.service";
import { Room } from "../../interfaces/room";

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './booking-approve-dialog.component.html',
  styleUrls: ['./booking-approve-dialog.component.scss']
})
export class BookingApproveDialogComponent implements OnInit {

  availableRooms: Room[] = [];
  selectedRoom: number | undefined;
  roomsAvailable = true;

  constructor(
    private roomService: RoomService,
    public dialogRef: MatDialogRef<BookingApproveDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ConfirmDialogData
  ) {
  }

  ngOnInit(): void {
    this.roomService.getAvailableRooms(this.data.booking).subscribe({
      next: availableRooms => {
        this.availableRooms = availableRooms;
        if (availableRooms.length === 0) {
          this.roomsAvailable = false;
        } else {
          this.selectedRoom = availableRooms[0].id;
        }
      },
      error: error => console.error(error)
    });
    }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
