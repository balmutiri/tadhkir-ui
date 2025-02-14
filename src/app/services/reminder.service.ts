import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReminderService {

  constructor(private http: HttpClient) {}

  sendReminder(reminderData: any): Observable<any> {
    console.log(reminderData);
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(`${environment.apis.default.url}/api/app/reminder/remind-me`, reminderData, { headers }).pipe(
      catchError((error) => {
        console.error('Error sending reminder:', error);
        throw error;
      })
    );
  }
}