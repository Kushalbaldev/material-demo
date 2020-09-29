import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocalechangeComponent } from './localechange.component';

describe('LocalechangeComponent', () => {
  let component: LocalechangeComponent;
  let fixture: ComponentFixture<LocalechangeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LocalechangeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LocalechangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
