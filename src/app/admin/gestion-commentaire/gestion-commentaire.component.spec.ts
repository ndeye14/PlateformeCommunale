import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionCommentaireComponent } from './gestion-commentaire.component';

describe('GestionCommentaireComponent', () => {
  let component: GestionCommentaireComponent;
  let fixture: ComponentFixture<GestionCommentaireComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GestionCommentaireComponent]
    });
    fixture = TestBed.createComponent(GestionCommentaireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
