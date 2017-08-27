import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HadithViewComponent } from './hadith-view.component';

describe('HadithViewComponent', () => {
  let component: HadithViewComponent;
  let fixture: ComponentFixture<HadithViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HadithViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HadithViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
