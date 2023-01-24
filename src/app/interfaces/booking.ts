import { DateTime } from "luxon";

export interface Booking {
  id?: number;
  userId: number;
  places: number;
  roomType: string;
  stayTime: DateTime[];
  bookingDate: DateTime;
}
