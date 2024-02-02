import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionAnnuaireComponent } from './gestion-annuaire.component';

describe('GestionAnnuaireComponent', () => {
  let component: GestionAnnuaireComponent;
  let fixture: ComponentFixture<GestionAnnuaireComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GestionAnnuaireComponent]
    });
    fixture = TestBed.createComponent(GestionAnnuaireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
