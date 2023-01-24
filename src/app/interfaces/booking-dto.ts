export interface BookingDto {
  id?: number;
  userId: number;
  places: number;
  roomType: string;
  stayTimeStart?: string;
  stayTimeEnd?: string;
  bookingDate?: string;
}
