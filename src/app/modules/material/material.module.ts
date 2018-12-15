import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { MatDialogModule, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatMenuModule } from '@angular/material/menu';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSnackBar, MatSnackBarModule } from '@angular/material';
import {MatRadioModule} from '@angular/material/radio';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatPaginatorModule} from '@angular/material/paginator';


import { ModalModule } from 'ngx-bootstrap';
import { PopoverModule } from 'ngx-bootstrap';
import { TooltipModule } from 'ngx-bootstrap';
import { CarouselModule } from 'ngx-bootstrap';
import { RatingModule } from 'ngx-bootstrap/rating';

@NgModule({
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatSidenavModule,
    MatAutocompleteModule,
    FormsModule,
    ReactiveFormsModule,
    MatTabsModule,
    MatDialogModule,
    MatAutocompleteModule,
    MatCardModule,
    MatIconModule,
    MatCheckboxModule,
    MatMenuModule,
    MatExpansionModule,
    MatChipsModule,
    MatTooltipModule,
    MatSnackBarModule,
    MatRadioModule,
    MatSlideToggleModule,
    MatPaginatorModule,
    RatingModule.forRoot(),
    ModalModule.forRoot(),
    PopoverModule.forRoot(),
    TooltipModule.forRoot(),
    CarouselModule.forRoot(),
  ],
  exports: [
    MatButtonModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatSidenavModule,
    MatAutocompleteModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatButtonModule,
    MatTabsModule,
    MatDialogModule,
    MatAutocompleteModule,
    MatCardModule,
    MatIconModule,
    MatCardModule,
    MatCheckboxModule,
    MatExpansionModule,
    MatMenuModule,
    MatChipsModule,
    MatTooltipModule,
    MatSnackBarModule,
    MatSlideToggleModule,
    MatPaginatorModule,
    ModalModule,
    PopoverModule,
    TooltipModule,
    CarouselModule,
    MatRadioModule,
    RatingModule
  ],
  declarations: []
})
export class MaterialModule { }


