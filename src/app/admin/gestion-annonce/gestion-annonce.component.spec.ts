import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionAnnonceComponent } from './gestion-annonce.component';

describe('GestionAnnonceComponent', () => {
  let component: GestionAnnonceComponent;
  let fixture: ComponentFixture<GestionAnnonceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GestionAnnonceComponent]
    });
    fixture = TestBed.createComponent(GestionAnnonceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
