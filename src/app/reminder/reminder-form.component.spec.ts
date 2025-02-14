import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReminderFormComponent } from './reminder-form.component';
import { ReactiveFormsModule } from '@angular/forms';

describe('ReminderFormComponent', () => {
  let component: ReminderFormComponent;
  let fixture: ComponentFixture<ReminderFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReminderFormComponent],
      imports: [ReactiveFormsModule],
      providers:[]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReminderFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});