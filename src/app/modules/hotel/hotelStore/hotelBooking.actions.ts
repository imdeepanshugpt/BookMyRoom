import { Action } from '@ngrx/store';
import { BookingState } from './hotelBooking.State';
export const bookHotels = 'BOOK_HOTELS';
export class BookHotels implements Action {
    readonly type = bookHotels;
    constructor(public payload: BookingState[]) {
    }
}

export type HotelBookingActions = BookHotels;
