import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerItemsComponent } from './manager-items.component';

describe('ManagerItemsComponent', () => {
  let component: ManagerItemsComponent;
  let fixture: ComponentFixture<ManagerItemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ManagerItemsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManagerItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
