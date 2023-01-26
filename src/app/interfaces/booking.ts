import { DateTime } from "luxon";

export interface Booking {
  id?: number;
  userId: number;
  personCount: number;
  roomType: string;
  stayTimeStart?: DateTime;
  stayTimeEnd?: DateTime;
  bookingDate?: DateTime;
}
