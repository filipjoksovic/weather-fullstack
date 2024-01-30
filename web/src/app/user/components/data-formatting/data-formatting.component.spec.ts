import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataFormattingComponent } from './data-formatting.component';

describe('DataFormattingComponent', () => {
  let component: DataFormattingComponent;
  let fixture: ComponentFixture<DataFormattingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DataFormattingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DataFormattingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
