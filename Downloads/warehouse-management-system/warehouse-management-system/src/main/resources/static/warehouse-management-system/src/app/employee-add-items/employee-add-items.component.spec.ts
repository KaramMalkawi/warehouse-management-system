import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeAddItemsComponent } from './employee-add-items.component';

describe('EmployeeAddItemsComponent', () => {
  let component: EmployeeAddItemsComponent;
  let fixture: ComponentFixture<EmployeeAddItemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EmployeeAddItemsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployeeAddItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
