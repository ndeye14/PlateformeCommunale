import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConditionComponent } from './condition.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';

describe('ConditionComponent', () => {
  let component: ConditionComponent;
  let fixture: ComponentFixture<ConditionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConditionComponent],
      imports: [HttpClientModule, HttpClient],
    });
    fixture = TestBed.createComponent(ConditionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
