import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CagadaComponent } from './cagada.component';

describe('CagadaComponent', () => {
  let component: CagadaComponent;
  let fixture: ComponentFixture<CagadaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CagadaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CagadaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
