import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisitHistoryComponent } from './visit-history.component';

describe('VisitHistoryComponent', () => {
  let component: VisitHistoryComponent;
  let fixture: ComponentFixture<VisitHistoryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VisitHistoryComponent]
    });
    fixture = TestBed.createComponent(VisitHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
