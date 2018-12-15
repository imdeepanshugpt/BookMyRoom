import { State } from './hotelStore.State';
import * as HotelsAction from './hotelStore.Actions';
const initialState = {
    hotelList: [],
    hotels: []
};

export function hotelStoreReducers(state = initialState, actions: HotelsAction.HotelsActions) {
    switch (actions.type) {
        case HotelsAction.addHotels:
            state.hotelList = actions.payload;
            return {
                ...state,
                // hotelList: [...actions.payload],
                hotels: [...state.hotelList]
            };
        case HotelsAction.removeHotels:
            return {
                ...state,
                hotels: []
            };
        case HotelsAction.sortHotelsByLessPrice:
            if (state.hotels.length === 0) {
                return {
                    ...state,
                    hotels: [...(state.hotelList.sort(function(a, b) {return a.hotelPrice - b.hotelPrice; }))]
                };
            } else {
                return {
                    ...state,
                    hotels: [...(state.hotels.sort(function(a, b) {return a.hotelPrice - b.hotelPrice; }))]
                };
            }
        case HotelsAction.sortHotelsByMorePrice:
            if (state.hotels.length === 0) {
                return {
                    ...state,
                    hotels: [...(state.hotelList.sort(function(a, b) {return b.hotelPrice - a.hotelPrice; }))]
                };
            } else {
                return {
                    ...state,
                    hotels: [...(state.hotels.sort(function(a, b) {return b.hotelPrice - a.hotelPrice; }))]
                };
            }
        case HotelsAction.sortHotelsByRating:
            if (state.hotels.length === 0) {
                return {
                    ...state,
                    hotels: [...(state.hotelList.sort(function(a, b) {return b.hotelAverageRating - a.hotelAverageRating; }))]
                };
            } else {
                return {
                    ...state,
                    hotels: [...(state.hotels.sort(function(a, b) {return b.hotelAverageRating - a.hotelAverageRating; }))]
                };
            }
        case HotelsAction.sortAmenities:
            state.hotels = [];
            // console.log(state.hotelList[0].hotelFeatures.ac);
            if (actions.payload.ac === false && actions.payload.wifi === false && actions.payload.food === false) {
                state.hotels = state.hotelList;
            } else if (actions.payload.ac === true && actions.payload.wifi === false && actions.payload.food === false) {
                for ( let i = 0; i < state.hotelList.length; i++ ) {
                   if ( state.hotelList[i].hotelFeatures.ac ) {
                      // console.log( state.hotelList[i].hotelFeatures.ac);
                        state.hotels.push(state.hotelList[i]);
                   }
                }
                // console.log('hi' + state.hotels.length);
            } else if (actions.payload.wifi === true && actions.payload.ac === false && actions.payload.food === false) {
                for ( let i = 0; i < state.hotelList.length; i++ ) {
                   if ( state.hotelList[i].hotelFeatures.wifi ) {
                      // console.log( state.hotelList[i].hotelFeatures.ac);
                        state.hotels.push(state.hotelList[i]);
                   }
                }
            } else if (actions.payload.food === true && actions.payload.ac === false && actions.payload.wifi === false) {
                for ( let i = 0; i < state.hotelList.length; i++ ) {
                   if ( state.hotelList[i].hotelFeatures.food ) {
                      // console.log( state.hotelList[i].hotelFeatures.ac);
                        state.hotels.push(state.hotelList[i]);
                   }
                }
            } else if (actions.payload.wifi === true && actions.payload.ac === true && actions.payload.food === false) {
                for ( let i = 0; i < state.hotelList.length; i++ ) {
                   if ( state.hotelList[i].hotelFeatures.wifi && state.hotelList[i].hotelFeatures.ac ) {
                      // console.log( state.hotelList[i].hotelFeatures.ac);
                        state.hotels.push(state.hotelList[i]);
                   }
                }
            } else if (actions.payload.wifi === true && actions.payload.ac === false && actions.payload.food === true) {
                for ( let i = 0; i < state.hotelList.length; i++ ) {
                   if ( state.hotelList[i].hotelFeatures.wifi && state.hotelList[i].hotelFeatures.food ) {
                      // console.log( state.hotelList[i].hotelFeatures.ac);
                        state.hotels.push(state.hotelList[i]);
                   }
                }
            } else if (actions.payload.wifi === false && actions.payload.ac === true && actions.payload.food === true) {
                for ( let i = 0; i < state.hotelList.length; i++ ) {
                   if ( state.hotelList[i].hotelFeatures.ac && state.hotelList[i].hotelFeatures.food ) {
                      // console.log( state.hotelList[i].hotelFeatures.ac);
                        state.hotels.push(state.hotelList[i]);
                   }
                }
            } else {
                for ( let i = 0; i < state.hotelList.length; i++ ) {
                    if ( state.hotelList[i].hotelFeatures.ac && state.hotelList[i].hotelFeatures.food
                        && state.hotelList[i].hotelFeatures.wifi ) {
                       // console.log( state.hotelList[i].hotelFeatures.ac);
                         state.hotels.push(state.hotelList[i]);
                    }
                 }
            }
            return state;
        default : return state;
    }
}


