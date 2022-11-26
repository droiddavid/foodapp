import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlatterDetailComponent } from './platter-detail.component';

describe('PlatterDetailComponent', () => {
  let component: PlatterDetailComponent;
  let fixture: ComponentFixture<PlatterDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlatterDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlatterDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
