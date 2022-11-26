import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlattersComponent } from './platters.component';

describe('PlattersComponent', () => {
  let component: PlattersComponent;
  let fixture: ComponentFixture<PlattersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlattersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlattersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
