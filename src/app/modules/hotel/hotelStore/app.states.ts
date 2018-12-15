import { AuthState } from './hotelStore.State';
import * as auth from './auth.reducers';

export interface AppState {
    authState: AuthState;
}

