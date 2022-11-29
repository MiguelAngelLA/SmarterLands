import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCropTableComponent } from './add-crop-table.component';

describe('AddCropTableComponent', () => {
  let component: AddCropTableComponent;
  let fixture: ComponentFixture<AddCropTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddCropTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddCropTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
