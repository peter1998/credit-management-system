import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoanListComponent } from './loan-list.component';

describe('LoanListComponent', () => {
  let component: LoanListComponent;
  let fixture: ComponentFixture<LoanListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoanListComponent]
    });
    fixture = TestBed.createComponent(LoanListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
