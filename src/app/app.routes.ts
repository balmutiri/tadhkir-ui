import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

export const routes: Routes = [
  { 
     path: '', redirectTo: 'reminder-form', pathMatch: 'full' ,
  },
  {
    path: 'reminder-form',
    loadChildren: () => import('./reminder/reminder-form.module').then(m => m.ReminderFormModule)
  },
];
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }
  