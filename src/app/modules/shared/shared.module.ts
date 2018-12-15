import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { MaterialModule } from '../material/material.module';
import { HttpService } from '../../globalComponent/http.service';
import { SearchComponent } from '../../globalComponent/search/search.component';
import { LoaderInterceptorService } from '../../globalComponent/auth.interceptors';
import { LoaderService } from '../../globalComponent/loader/loader-service';


@NgModule({
  declarations: [SearchComponent],
  imports: [
    CommonModule,
    MaterialModule,
    HttpClientModule,
  ],
  exports: [
    MaterialModule,
    SearchComponent,
  ],
  providers: [
    HttpService,
    LoaderService,
    { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptorService, multi: true }
  ]
})
export class SharedModule { }
