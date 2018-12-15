import { Action } from '@ngrx/store';

export const SIGNUP = 'SIGNUP';
export const SIGNIN = 'SIGNIN';
export const LOGOUT = 'LOGOUT';
export const SET_TOKEN = 'SET_TOKEN';
export const SET_DECODED_TOKEN = 'export const';
export const BOOKED = 'BOOKED';
export const VIEWED = 'VIEWED';
export const ADMIN = 'ADMIN';
export const ADMIN_UPDATE = 'ADMIN_UPDATE';
export const EDIT_PROFILE = 'EDIT_PROFILE';
export const MANAGER = 'MANAGER';


export class Signup implements Action {
    readonly type = SIGNUP;
    constructor (public payload: object) {}
}

export class Signin implements Action {
    readonly type = SIGNIN;
    constructor (public payload: object) {}
}

export class Logout implements Action {
    readonly type = LOGOUT;
}

export class SetToken implements Action {
    readonly type = SET_TOKEN;
    constructor (public payload: string) {}
}

export class SetDecodedToken implements Action {
    readonly type = SET_DECODED_TOKEN;
    constructor (public payload: string) {}
}

export class Booked implements Action {
    readonly type = BOOKED;
}
export class Viewed implements Action {
    readonly type = VIEWED;
}
export class SignInAdmin implements Action {
    readonly type = ADMIN;
}
export class AdminUpdate implements Action {
    readonly type = ADMIN_UPDATE;
}
export class EditProfile implements Action {
    readonly type = EDIT_PROFILE;
    constructor (public payload: boolean) {}
}
export class Manager implements Action {
    readonly type = MANAGER;
}


export type AuthActions = Signup | Signin | SetToken | Logout | SetDecodedToken | Booked | Viewed |
SignInAdmin | AdminUpdate | EditProfile | Manager;
