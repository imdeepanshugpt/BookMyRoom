import { Action } from '@ngrx/store';
import {State} from './hotelStore.State';
import { Amenities } from './hotelStore.State';
export const addHotels = 'ADD_HOTELS';
export const removeHotels = 'REMOVE_HOTELS';
export const sortHotelsByLessPrice = 'HOTEL_LESS_PRICE';
export const sortHotelsByMorePrice = 'HOTEL_MORE_PRICE';
export const sortHotelsByRating = 'HOTEL_RATING';
export const sortAmenities = 'HOTEL_AMENITIES';

export class AddHotels implements Action {
    readonly type = addHotels;
    constructor(public payload: State[]) {
    }
}
export class RemoveHotels implements Action {
    readonly type = removeHotels;
}
export class SortHotelsByLessPrice implements Action {
    readonly type = sortHotelsByLessPrice;
}
export class SortHotelsByMorePrice implements Action {
    readonly type = sortHotelsByMorePrice;
}
export class SortHotelsByRating implements Action {
    readonly type = sortHotelsByRating;
}
export class SortAmenities implements Action {
    readonly type = sortAmenities;
    constructor(public payload: Amenities) {
    }
}
export type HotelsActions = AddHotels | RemoveHotels | SortHotelsByLessPrice | SortHotelsByMorePrice | SortHotelsByRating | SortAmenities;
