import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MpTableComponent } from './mp-table.component';

describe('MpTableComponent', () => {
  let component: MpTableComponent;
  let fixture: ComponentFixture<MpTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MpTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MpTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
