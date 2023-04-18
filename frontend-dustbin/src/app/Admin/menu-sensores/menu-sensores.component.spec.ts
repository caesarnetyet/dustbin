import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuSensoresComponent } from './menu-sensores.component';

describe('MenuSensoresComponent', () => {
  let component: MenuSensoresComponent;
  let fixture: ComponentFixture<MenuSensoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenuSensoresComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenuSensoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
