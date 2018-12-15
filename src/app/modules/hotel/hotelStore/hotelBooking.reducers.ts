import { BookingState } from './hotelBooking.State';
import * as  HotelBookingAction from './hotelBooking.actions';
const initialState = {
    hotelBooking: []
};

export function hotelBookingReducers(state = initialState, actions: HotelBookingAction.HotelBookingActions) {
    switch (actions.type) {
        case HotelBookingAction.bookHotels:
            return {
                ...state,
                hotelBooking: [...actions.payload]
            };
        default : return state;
    }
}

