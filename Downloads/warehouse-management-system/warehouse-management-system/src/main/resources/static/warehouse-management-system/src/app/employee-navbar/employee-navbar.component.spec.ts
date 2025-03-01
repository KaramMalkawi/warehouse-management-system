import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeNavbarComponent } from './employee-navbar.component';

describe('EmployeeNavbarComponent', () => {
  let component: EmployeeNavbarComponent;
  let fixture: ComponentFixture<EmployeeNavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EmployeeNavbarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployeeNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
