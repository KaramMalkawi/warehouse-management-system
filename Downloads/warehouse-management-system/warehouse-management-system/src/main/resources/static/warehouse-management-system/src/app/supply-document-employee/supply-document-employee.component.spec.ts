import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplyDocumentEmployeeComponent } from './supply-document-employee.component';

describe('SupplyDocumentEmployeeComponent', () => {
  let component: SupplyDocumentEmployeeComponent;
  let fixture: ComponentFixture<SupplyDocumentEmployeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SupplyDocumentEmployeeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SupplyDocumentEmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
