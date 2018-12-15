import { Action } from '@ngrx/store';
import {State} from './hotelStore.State';
export const compareHotels = 'COMPARE_HOTELS';
export const remCompareHotels = 'REMOVE_HOTELS';

export class CompareHotels implements Action {
    readonly type = compareHotels;
    constructor(public payload: State[]) {
    }
}
export class RemCompareHotels implements Action {
    readonly type = remCompareHotels;
}

export type HotelCompareActions = CompareHotels | RemCompareHotels ;
