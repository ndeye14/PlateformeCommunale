import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BienPerduRetrouveComponent } from './bien-perdu-retrouve.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';

describe('BienPerduRetrouveComponent', () => {
  let component: BienPerduRetrouveComponent;
  let fixture: ComponentFixture<BienPerduRetrouveComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BienPerduRetrouveComponent],
      imports: [HttpClientModule, HttpClient],
    });
    fixture = TestBed.createComponent(BienPerduRetrouveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
