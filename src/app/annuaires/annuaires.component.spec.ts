import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnuairesComponent } from './annuaires.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';

describe('AnnuairesComponent', () => {
  let component: AnnuairesComponent;
  let fixture: ComponentFixture<AnnuairesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AnnuairesComponent],
      imports: [HttpClientModule, HttpClient],
    });
    fixture = TestBed.createComponent(AnnuairesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
