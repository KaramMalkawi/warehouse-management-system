import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerAddItemComponent } from './manager-add-item.component';

describe('ManagerAddItemComponent', () => {
  let component: ManagerAddItemComponent;
  let fixture: ComponentFixture<ManagerAddItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ManagerAddItemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManagerAddItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
