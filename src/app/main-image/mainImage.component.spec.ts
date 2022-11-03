import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainImageComponent } from './mainImage.component';

describe('MainImageComponent', () => {
  let component: MainImageComponent;
  let fixture: ComponentFixture<MainImageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainImageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MainImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
