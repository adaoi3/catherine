import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingDeclineDialogComponent } from './booking-decline-dialog.component';

describe('BookingDeclineDialogComponent', () => {
  let component: BookingDeclineDialogComponent;
  let fixture: ComponentFixture<BookingDeclineDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookingDeclineDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookingDeclineDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
