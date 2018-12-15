import { AuthState } from './hotelStore.State';
import * as AuthActions from './auth.actions';

const initialState: AuthState = {
    token: null,
    authenticated: false,
    decoded: {},
    name: '',
    email: '',
    booked: false,
    viewed: false,
    admin: false,
    adminUpdate: false,
    editProfile: true,
    manager: false
};

export function authReducer(state = initialState, action: AuthActions.AuthActions) {
    switch (action.type) {
        case (AuthActions.SIGNIN):
        case (AuthActions.SIGNUP):
            // console.log(state.authenticated);
            // state.authenticated = true;
            // console.log(state.authenticated);
            return {
                ...state,
                authenticated: true,
                name: action.payload['name'],
                email: action.payload['email']
            };
        case (AuthActions.LOGOUT):
            return {
                ...state,
                token: null,
                manager: false,
                authenticated: false,
                booked: false,
                viewed: false,
                name: ''
            };
        case (AuthActions.SET_TOKEN):
            return {
                ...state,
                token: action.payload
            };
        case (AuthActions.SET_DECODED_TOKEN):
            return {
                ...state,
                decoded: action.payload
            };
        case AuthActions.BOOKED:
            return {
                ...state,
                booked: true
            };
        case AuthActions.VIEWED:
            return {
                ...state,
                viewed: true
            };
        case AuthActions.ADMIN:
            return {
                ...state,
                name: 'ADMIN',
                authenticated: true,
                admin: true
            };
        case AuthActions.ADMIN_UPDATE:
            return {
                ...state,
                adminUpdate: true,
                authenticated: true
            };
        case AuthActions.EDIT_PROFILE:
            return {
                ...state,
                editProfile: action.payload
            };

        case AuthActions.MANAGER:
            return {
                ...state,
                manager: true,
            };
        default:
            return state;
    }

}
