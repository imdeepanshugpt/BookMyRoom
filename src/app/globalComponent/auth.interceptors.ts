// import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
// import { Observable } from 'rxjs/Observable';
// import 'rxjs/add/operator/do';
// export class AuthInterceptors implements HttpInterceptor {
//     intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
//         return next.handle(req);
//     }
// }
import { Injectable, Injector } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable, pipe } from 'rxjs';
import { tap } from 'rxjs/operators';
import { LoaderService } from './loader/loader-service';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class LoaderInterceptorService implements HttpInterceptor {
  constructor(private loaderService: LoaderService, private router: Router) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.showLoader();
    console.log(req);
    if (req.method === 'POST') {
      if (navigator.onLine) {
        return next.handle(req).pipe(tap((event: HttpEvent<any>) => {
          if (event instanceof HttpResponse) {
            this.onEnd();
          }
        },
          (err: any) => {
            this.onEnd();
          }
        ));
      } else {
        this.router.navigate(['/offline']);
      }
    } else {
      return next.handle(req).pipe(tap((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          this.onEnd();
        }
      },
        (err: any) => {
          this.onEnd();
        }
      ));
    }
  }
  private onEnd(): void {
    this.hideLoader();
  }
  private showLoader(): void {
    this.loaderService.show();
  }
  private hideLoader(): void {
    this.loaderService.hide();
  }
}
