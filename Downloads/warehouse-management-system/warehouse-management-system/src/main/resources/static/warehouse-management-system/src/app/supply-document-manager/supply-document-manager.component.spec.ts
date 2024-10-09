import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplyDocumentManagerComponent } from './supply-document-manager.component';

describe('SupplyDocumentManagerComponent', () => {
  let component: SupplyDocumentManagerComponent;
  let fixture: ComponentFixture<SupplyDocumentManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SupplyDocumentManagerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SupplyDocumentManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
