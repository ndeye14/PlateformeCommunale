import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionRessourceComponent } from './gestion-ressource.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';

describe('GestionRessourceComponent', () => {
  let component: GestionRessourceComponent;
  let fixture: ComponentFixture<GestionRessourceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GestionRessourceComponent],
      imports: [HttpClientModule, HttpClient],
    });
    fixture = TestBed.createComponent(GestionRessourceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
