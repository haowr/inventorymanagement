import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EachLocationComponent } from './each-location.component';

describe('EachLocationComponent', () => {
  let component: EachLocationComponent;
  let fixture: ComponentFixture<EachLocationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EachLocationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EachLocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
