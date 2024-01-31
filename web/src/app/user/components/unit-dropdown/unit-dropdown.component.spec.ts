import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnitDropdownComponent } from './unit-dropdown.component';

describe('UnitDropdownComponent', () => {
  let component: UnitDropdownComponent;
  let fixture: ComponentFixture<UnitDropdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UnitDropdownComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UnitDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
