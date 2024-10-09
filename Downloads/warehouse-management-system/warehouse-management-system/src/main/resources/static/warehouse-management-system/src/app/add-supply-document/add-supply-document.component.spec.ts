import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSupplyDocumentComponent } from './add-supply-document.component';

describe('AddSupplyDocumentComponent', () => {
  let component: AddSupplyDocumentComponent;
  let fixture: ComponentFixture<AddSupplyDocumentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddSupplyDocumentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddSupplyDocumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
