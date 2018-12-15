import { State } from './hotelStore.State';
import * as HotelCompareAction from './hotelCompare.action';
const initialState = {
    hotels: []
};
export function hotelCompareReducers(state = initialState, actions: HotelCompareAction.HotelCompareActions) {
    switch (actions.type) {
        case HotelCompareAction.compareHotels:
            return{
                ...state,
                hotels: [...actions.payload]
            };
        case HotelCompareAction.remCompareHotels:
            return{
                ...state,
                hotels: []
            };
            default : return state;

    }

}
