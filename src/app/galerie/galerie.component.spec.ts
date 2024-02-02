import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GalerieComponent } from './galerie.component';

describe('GalerieComponent', () => {
  let component: GalerieComponent;
  let fixture: ComponentFixture<GalerieComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GalerieComponent]
    });
    fixture = TestBed.createComponent(GalerieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
