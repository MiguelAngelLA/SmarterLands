import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BinDimensionsComponent } from './bin-dimensions.component';

describe('BinDimensionsComponent', () => {
  let component: BinDimensionsComponent;
  let fixture: ComponentFixture<BinDimensionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BinDimensionsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BinDimensionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
