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
export class GlobalErrorHandler extends ErrorHandler {

  constructor(private injector: Injector) {
    // to call the constructor of base's class
    // super(true);
    super();
  }
  handleError(error: any): void {
    // this.loadingComponent.onCloseModal();
    if (error != null) {
      // const loggingService = this.injector.get(LoggingService);
      const message = error.message ? error.message : error.toString();
      const location = this.injector.get(LocationStrategy);
      const url = location instanceof PathLocationStrategy ? location.path() : '';

      throw error;
    } else {
      super.handleError(error);
    }
  }

}

