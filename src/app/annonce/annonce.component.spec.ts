import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnonceComponent } from './annonce.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';

describe('AnnonceComponent', () => {
  let component: AnnonceComponent;
  let fixture: ComponentFixture<AnnonceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AnnonceComponent],
      imports: [HttpClientModule, HttpClient],
    });
    fixture = TestBed.createComponent(AnnonceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
