import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlatterItemsComponent } from './platter-items.component';

describe('PlatterItemsComponent', () => {
  let component: PlatterItemsComponent;
  let fixture: ComponentFixture<PlatterItemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlatterItemsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlatterItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
