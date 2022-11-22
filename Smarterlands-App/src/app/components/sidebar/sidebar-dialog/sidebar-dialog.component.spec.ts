import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarDialogComponent } from './sidebar-dialog.component';

describe('SidebarDialogComponent', () => {
  let component: SidebarDialogComponent;
  let fixture: ComponentFixture<SidebarDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SidebarDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SidebarDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
