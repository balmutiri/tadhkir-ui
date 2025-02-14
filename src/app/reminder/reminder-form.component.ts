import { Component, OnInit  } from '@angular/core';
import { FormBuilder, FormGroup, Validators  } from '@angular/forms';
import { ReminderService } from '../services/reminder.service';
import { TranslateService } from '@ngx-translate/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-reminder-form',
  templateUrl: './reminder-form.component.html',
  styleUrls: ['./reminder-form.component.scss'],
  standalone: false,
})

export class ReminderFormComponent implements OnInit {
  remindForm: FormGroup;
  isEnglish: boolean = false;
  isRtl: boolean;
  minDate: string;
  isSubmitting = false;

  constructor(private fb: FormBuilder, private reminderService: ReminderService, private translate: TranslateService, private snackBar: MatSnackBar) {
    const lang = localStorage.getItem('lang') || 'ar';
    this.translate.use(lang);
  }

  ngOnInit(): void {
    console.log('ReminderForm initialized!');
    this.minDate = new Date().toISOString().split('T')[0];

    let lang = localStorage.getItem('lang')
    this.isEnglish = lang == 'en' ? true : false;

    if (lang && lang == 'en') this.isRtl = false;
    else {
      this.isRtl = true;
      document.body.classList.add('rtl');
      document.dir = "rtl"
    }
    
    this.remindForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      text: ['', Validators.required],
      sendDate: ['', Validators.required],
      time: ['', Validators.required]
    });
  }
  
  onTimeChange(time: string): void {
    console.log('on time change trigged');

    if (time) {
      this.remindForm.get('time')?.setValue(time);
      console.log('Selected Time:', time);
    } else {
      console.error('No time selected!');
    }
  }

  
  switchLanguage(selectedEnglish: boolean) {
    let lang = localStorage.getItem('lang')
    if (lang) {
      switch (lang) {
        case 'ar': {
          lang = 'en';
          break;
        }
        case 'en': {
          lang = 'ar';
          break;
        }
      }
      localStorage.setItem('lang', lang);
      this.translate.use(lang);
    }
    this.isEnglish = selectedEnglish;
    window.location.reload();
  }

  onSubmit() {
    console.log("Submit button clicked!");
    if (this.isSubmitting) {
      return; // Prevent duplicate submissions
    }
    this.isSubmitting = true;

      const formValue = this.remindForm.value;
      const currentDate = new Date();
      const selectedDate = new Date(formValue.sendDate);
      console.log("time: "+formValue.time);

      const { hours, minutes } = this.parseTime(formValue.time);


      //Combine date and time
      const selectedDateTime = new Date(
        selectedDate.getFullYear(),
        selectedDate.getMonth(),
        selectedDate.getDate(),
        hours,
        minutes
      );
    
      if (selectedDateTime < currentDate) {
        console.log('selectedDateTime'+selectedDateTime+' currentDate' + currentDate);

        this.isRtl = this.translate.currentLang === 'ar';
        this.translate
        .get("FutureDateError") 
        .subscribe((translatedMessage: string) => {
          this.snackBar.open(translatedMessage, 'X', {
            duration: 5000, 
            panelClass: ['custom-snackbar', this.isRtl ? 'rtl-snackbar' : 'ltr-snackbar'], 
            horizontalPosition: this.isRtl ? 'right' : 'left', 
            verticalPosition: 'top', 
          });
        });

        this.isSubmitting = false; // Re-enable the button
        return;
      }

      formValue.sendDate = selectedDateTime.toISOString();
      console.log(formValue);

      delete formValue.time;

      // Call the service to send the data
      this.reminderService.sendReminder(formValue).subscribe({
        next: (response) => {
          console.log("Reminder sent successfully:", response);
          this.translate
          .get("SubmitSuccessfully") 
          .subscribe((translatedMessage: string) => {
            this.snackBar.open(translatedMessage, void 0, {
              duration: 5000, 
              panelClass: ['success-snackbar', this.isRtl ? 'rtl-snackbar' : 'ltr-snackbar'], 
              horizontalPosition: 'center', 
              verticalPosition: 'top', 
            });
          });
          // Clear the form inputs
          this.remindForm.reset();
          this.isSubmitting = false; // Re-enable the button
        },
        error: (error) => {
          console.error("Error sending reminder:", error);
          this.isSubmitting = false; // Re-enable the button
        }
      });
    }

    parseTime(time: string): { hours: number; minutes: number } {
      if (!time) {
        console.error("Time is undefined or empty.");
        return { hours: 0, minutes: 0 }; // Default to midnight
      }
    
      // Replace Arabic AM/PM with English
      time = time.replace('ص', 'AM').replace('م', 'PM');
    
      // Split into time part and modifier (AM/PM)
      const [timePart, modifier] = time.split(' '); 
      const [hours, minutes] = timePart.split(':').map(Number);
    
      if (isNaN(hours) || isNaN(minutes)) {
        console.error("Invalid time format:", time);
        throw new Error("Invalid time format");
      }
    
      // Convert to 24-hour format
      let adjustedHours = hours;
      if (modifier === 'PM' && hours !== 12) {
        adjustedHours += 12; // Add 12 for PM, except at 12 PM
      } else if (modifier === 'AM' && hours === 12) {
        adjustedHours = 0; // Midnight (12 AM) is 0 hours
      }
    
      return { hours: adjustedHours, minutes };
    }
}