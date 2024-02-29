import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionBienComponent } from './gestion-bien.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';

describe('GestionBienComponent', () => {
  let component: GestionBienComponent;
  let fixture: ComponentFixture<GestionBienComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GestionBienComponent],
      imports: [HttpClientModule, HttpClient],
    });
    fixture = TestBed.createComponent(GestionBienComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
