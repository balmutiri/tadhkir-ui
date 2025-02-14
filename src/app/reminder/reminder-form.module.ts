import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReminderFormComponent } from './reminder-form.component';
import { RouterOutlet } from '@angular/router';
import {TranslateLoader,  TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import { ReminderService } from '../services/reminder.service';
import { routes } from '../app.routes';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgxMatTimepickerModule } from 'ngx-mat-timepicker';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClient, provideHttpClient } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar';

export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http, './i18n/', '.json');
}

@NgModule({
  declarations: [ReminderFormComponent],
  imports: [
      FormsModule,
      ReactiveFormsModule,
      CommonModule,
      NgxMatTimepickerModule,
      NgxMatTimepickerModule.setLocale('ar'),
      BrowserAnimationsModule,
      TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
        }
      }),
      TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
        }
      }),
      MatSnackBarModule
    ],
    providers: [ReminderService, provideHttpClient()],
    bootstrap: [ReminderFormComponent],
    schemas: [
      CUSTOM_ELEMENTS_SCHEMA
    ],
    exports: [ReminderFormComponent,    
       ReactiveFormsModule,
      NgxMatTimepickerModule,
      TranslateModule],

})
export class ReminderFormModule { }