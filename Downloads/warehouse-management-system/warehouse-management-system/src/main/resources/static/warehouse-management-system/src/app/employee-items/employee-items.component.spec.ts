import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeItemsComponent } from './employee-items.component';

describe('EmployeeItemsComponent', () => {
  let component: EmployeeItemsComponent;
  let fixture: ComponentFixture<EmployeeItemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EmployeeItemsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployeeItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
