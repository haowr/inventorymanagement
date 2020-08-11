import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EachClientComponent } from './each-client.component';

describe('EachClientComponent', () => {
  let component: EachClientComponent;
  let fixture: ComponentFixture<EachClientComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EachClientComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EachClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
