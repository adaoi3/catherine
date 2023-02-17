import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingApproveDialogComponent } from './booking-approve-dialog.component';

describe('ConfirmDialogComponent', () => {
  let component: BookingApproveDialogComponent;
  let fixture: ComponentFixture<BookingApproveDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookingApproveDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookingApproveDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
