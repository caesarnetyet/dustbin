import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuClientsComponent } from './menu-clients.component';

describe('MenuClientsComponent', () => {
  let component: MenuClientsComponent;
  let fixture: ComponentFixture<MenuClientsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenuClientsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenuClientsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
