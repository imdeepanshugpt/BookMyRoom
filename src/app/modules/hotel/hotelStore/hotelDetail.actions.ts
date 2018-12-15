import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import {State} from './hotelStore.State';
export const viewHotels = 'VIEW_HOTELS';
export class ViewHotels implements Action {

    readonly type = viewHotels;

    constructor(public payload: State[]) {
    }
}
export type viewHotelActions = ViewHotels ;
