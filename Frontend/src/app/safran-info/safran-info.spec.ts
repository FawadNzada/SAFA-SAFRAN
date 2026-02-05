import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SafranInfo } from './safran-info';

describe('SafranInfo', () => {
  let component: SafranInfo;
  let fixture: ComponentFixture<SafranInfo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SafranInfo]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SafranInfo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
