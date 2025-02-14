import { Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Pipe({
  name: 'reminderTranslate'
})
export class ReminderTranslatePipe implements PipeTransform {
  constructor(private localizationService:TranslateService){}
  transform(ar_value: string, en_value: string): string {
    let lang = this.localizationService.currentLang;
    return lang=="ar"?ar_value:en_value
  }

}