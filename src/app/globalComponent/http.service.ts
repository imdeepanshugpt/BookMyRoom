import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { State } from '../modules/hotel/hotelStore/hotelStore.State';
import { AngularFireModule } from 'angularfire2';
import { environment } from '../../environments/environment';
import { GlobalErrorHandler } from './global-error-handler/global-error-handler';
import { GlobalHTTPErrorHandler } from './global-error-handler/global-http-error-handler';



@Injectable({
    providedIn: 'root'
})
export class HttpService {
    public baseUrl = environment.baseUrl;
    constructor(private http: HttpClient, private globalHTTPErrorHandler: GlobalHTTPErrorHandler) { }

    get(path: string): Observable<any> {
        return this.http.get(this.baseUrl + '/' + path)
        .map(res => this.extractData(res))
        .catch(err => this.globalHTTPErrorHandler.handleError(err));
    }
    post(path, body): Observable<any> {
        return this.http.post(this.baseUrl + '/' + path, body)
        .map(res => this.extractData(res))
        .catch(err => this.globalHTTPErrorHandler.handleError(err));
    }
    delete(path, params): Observable<any> {
        return this.http.delete(this.baseUrl + '/' + path  + '/' + params)
        .map(res => this.extractData(res))
        .catch(err => this.globalHTTPErrorHandler.handleError(err));
    }
    put(path, params, body): Observable<any> {
        return this.http.put(this.baseUrl + '/' + path + '/' + params, body)
        .map(res => this.extractData(res))
        .catch(err => this.globalHTTPErrorHandler.handleError(err));
    }
    private extractData(res: any) {
        return res || {};
    }

}

