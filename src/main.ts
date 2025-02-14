import { bootstrapApplication } from '@angular/platform-browser';
import { ReminderFormModule } from '../src/app/reminder/reminder-form.module';
import { provideHttpClient } from '@angular/common/http';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

platformBrowserDynamic().bootstrapModule(ReminderFormModule)
  .catch(err => console.error(err));