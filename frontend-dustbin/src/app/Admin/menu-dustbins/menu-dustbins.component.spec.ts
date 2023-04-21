import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuDustbinsComponent } from './menu-dustbins.component';

describe('MenuDustbinsComponent', () => {
  let component: MenuDustbinsComponent;
  let fixture: ComponentFixture<MenuDustbinsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenuDustbinsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenuDustbinsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
