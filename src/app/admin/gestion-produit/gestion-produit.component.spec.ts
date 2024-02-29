import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionProduitComponent } from './gestion-produit.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';

describe('GestionProduitComponent', () => {
  let component: GestionProduitComponent;
  let fixture: ComponentFixture<GestionProduitComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GestionProduitComponent],
      imports: [HttpClientModule, HttpClient],
    });
    fixture = TestBed.createComponent(GestionProduitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
