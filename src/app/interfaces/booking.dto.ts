export interface BookingDto {
  id?: number;
  userId: number;
  personCount: number;
  roomType: string;
  stayTimeStart?: string;
  stayTimeEnd?: string;
  bookingDate?: string;
  adminId?: number;
  roomId?: number;
  status?: string;
}
