import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEmailAddressComponent } from './add-email-address.component';

describe('AddEmailAddressComponent', () => {
  let component: AddEmailAddressComponent;
  let fixture: ComponentFixture<AddEmailAddressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEmailAddressComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEmailAddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
