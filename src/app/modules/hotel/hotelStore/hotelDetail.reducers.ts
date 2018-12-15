import { State } from './hotelStore.State';
import * as HotelViewActions from './hotelDetail.actions';

const initialState = {
    hotels: []
};

export function hotelViewReducers(state = initialState, action: HotelViewActions.viewHotelActions) {

    switch (action.type) {
        case HotelViewActions.viewHotels:
            return{
                ...state,
                hotels: [action.payload]
            };

        default:
            return state;
    }
}