import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReminderService } from './services/reminder.service';
import { routes } from './app.routes'; // Import the routing module
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {TranslateLoader, TranslateStore, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import { HttpClient, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { ReminderFormModule } from './reminder/reminder-form.module';
import { ReminderFormComponent } from './reminder/reminder-form.component';

@NgModule({
    declarations: 
    [    
       ReminderFormComponent
    ],
  imports: [routes,
    ReminderFormModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    NgxMaterialTimepickerModule,
    NgxMaterialTimepickerModule.setOpts('ar-AE', 'arab'),
    BrowserAnimationsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  providers: [ReminderService, provideHttpClient()],
  exports: [
    ReactiveFormsModule,
    NgxMaterialTimepickerModule,
    TranslateModule
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class CoreModule { 

}

export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}