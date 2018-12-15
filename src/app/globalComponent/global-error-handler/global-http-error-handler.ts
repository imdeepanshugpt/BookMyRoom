import { ErrorHandler, Injectable, Injector, Inject } from '@angular/core';
import { LocationStrategy, PathLocationStrategy } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import { AppError } from './app-error';
import { BadInputError } from './bad-input-error';
import { NotFoundError } from './not-found-error';
import { InternalServerError } from './server-error';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class GlobalHTTPErrorHandler {
    constructor( private toastr: ToastrService) { }

    public handleError(error: any) {
        console.log('called');
        let errMsg: string;
        if (error.error instanceof HttpErrorResponse) {
            const body = error || '';
            const err = body || JSON.stringify(body);
            errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
            console.error('%c ERROR !!! ', 'background: #FF0000; color: #FFF', errMsg);
            this.toastr.error(errMsg, 'ERROR' , {
              timeOut: 3000
            });
        } else {
            if (error.status === 404) {
                this.toastr.error(error.message, error.name, {
                  timeOut: 3000
                });
                return Observable.throw(new NotFoundError());
            } else if (error.status === 400) {
                this.toastr.error(error.message, error.name, {
                  timeOut: 3000
                });
                return Observable.throw(new BadInputError(error.error.json()));
            } else if (error.status === 500) {
                this.toastr.error(error.message, error.name, {
                  timeOut: 3000
                });
                return Observable.throw(new InternalServerError());
            } else {
                this.toastr.error(error.message, error.name, {
                  timeOut: 3000
                });
                return Observable.throw(new AppError(error));
            }
        }
        return Observable.throw(error);
    }
}
