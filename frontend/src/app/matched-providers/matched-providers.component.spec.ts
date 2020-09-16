import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchedProvidersComponent } from './matched-providers.component';

describe('MatchedProvidersComponent', () => {
  let component: MatchedProvidersComponent;
  let fixture: ComponentFixture<MatchedProvidersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MatchedProvidersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatchedProvidersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
