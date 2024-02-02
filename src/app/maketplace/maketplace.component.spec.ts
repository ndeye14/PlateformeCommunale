import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaketplaceComponent } from './maketplace.component';

describe('MaketplaceComponent', () => {
  let component: MaketplaceComponent;
  let fixture: ComponentFixture<MaketplaceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MaketplaceComponent]
    });
    fixture = TestBed.createComponent(MaketplaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
