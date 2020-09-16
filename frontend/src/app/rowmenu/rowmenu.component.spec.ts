import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RowmenuComponent } from './rowmenu.component';

describe('RowmenuComponent', () => {
  let component: RowmenuComponent;
  let fixture: ComponentFixture<RowmenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RowmenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RowmenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
