import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionCommentaireComponent } from './gestion-commentaire.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';

describe('GestionCommentaireComponent', () => {
  let component: GestionCommentaireComponent;
  let fixture: ComponentFixture<GestionCommentaireComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GestionCommentaireComponent],
      imports: [HttpClientModule, HttpClient],
    });
    fixture = TestBed.createComponent(GestionCommentaireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
