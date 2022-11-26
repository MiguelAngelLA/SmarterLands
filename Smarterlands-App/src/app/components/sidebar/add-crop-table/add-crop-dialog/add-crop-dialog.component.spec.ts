import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCropDialogComponent } from './add-crop-dialog.component';

describe('AddCropDialogComponent', () => {
  let component: AddCropDialogComponent;
  let fixture: ComponentFixture<AddCropDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddCropDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddCropDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
